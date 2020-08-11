import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject, combineLatest, BehaviorSubject, of } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router'; 
import { firestore } from 'firebase/app';
import { map, switchMap, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,
  QueryDocumentSnapshot
 } from '@angular/fire/firestore';

 import { AngularFireAuth } from '@angular/fire/auth';

 import { Event} from '../model/event.model';
 import { Opgave} from '../model/opgave.model';
 import { startOfDay, isSameDay, endOfDay, isSameMonth } from 'date-fns';

@Injectable({
    providedIn: 'root'
  })
export class KalenderService implements Resolve<any>
{
    events: any;
    onEventsUpdated: Subject<any>;
    

    /**
     * Constructor 
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private afs: AngularFirestore,
        private auth: AuthService,
        
    )
    {
        // Set the defaults
        this.onEventsUpdated = new Subject();
    }

    async update(savekalenderId, data: Event){
 
return this.afs.collection('opgaver').doc(savekalenderId).update(data)
   
         
      }

    async create(data: Event){
        const { uid } = await this.auth.getUser();  
    
alert(data);
        return await this.afs.collection('opgaver').add(data)
          .then((ref) => {
            console.log(ref)
//            return Promise.resolve(ref.id)

const uiddata =  {
          uid
}

return this.afs.collection('opgaver').doc(ref.id).update(uiddata)
          })
         
      }

/*
      async createUserCalendarEvent() {
        const { uid } = await this.auth.getUser();   
        const dateId = Date.now();

        
        const data = {
        //  title,
        //  start,
        //  end,
          uid,
          actions: [],
          color: {},
          allDay: true,
          createdAt: Date.now(),
        };
    
        const docRef = await this.afs.collection('begivenheder').add(data);
       const id = docRef.id;

       const iddata = {
id
    };
        return this.afs
        .collection('begivenheder')
        .doc(id)
        .update(iddata)
        }; 

*/

    deleteUserCalenderData(deletekalenderId) {
    
        return this.afs
            .collection('opgaver')
            .doc(deletekalenderId)
            .delete();
 
}

      getUserCalendarData() {
        return this.auth.user$.pipe(
          switchMap(user => {
            return this.afs
              .collection('opgaver', ref => ref.where('uid', '==', user.uid))
              .snapshotChanges()

              .pipe( 
                tap(opgaver => console.log(opgaver)),
                map(actions => {
                  return actions.map(a => {
                    let data: any = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    data.start = data.start.toDate();
                    data.end = data.end.toDate();
                    return { id, ...data };
                    
                  });
                })
              );
          })
        );
      }

      // Virker

      /*
    getData():Observable<any[]>{
        return this.afs.collection('begivenheder').valueChanges()
        .pipe(
            tap(begivenheder => console.log(begivenheder)),
            map(begivenheder => begivenheder.map(begivenheder => {
                let data: any=begivenheder;
              
                data.start = data.start.toDate();
                data.end = data.end.toDate();
                data.start = new Date(data.start) || startOfDay(new Date());
                data.end = new Date(data.end) || endOfDay(new Date());
                data.title = data.title || '';
                data.color = {
                    primary  : data.color && data.color.primary || '#1e90ff',
                    secondary: data.color && data.color.secondary || '#D1E8FF'
                };
                data.draggable = data.draggable;
                data.resizable = {
                    beforeStart: data.resizable && data.resizable.beforeStart || true,
                    afterEnd   : data.resizable && data.resizable.afterEnd || true
                };
                data.actions = data.actions || [];
                data.allDay = data.allDay || false;
                data.cssClass = data.cssClass || '';
                data.meta = {
                    location: data.meta && data.meta.location || '',
                    notes   : data.meta && data.meta.notes || ''
                };
                
                return data;

            }
                )) );
    }
*/
  

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getEvents()
            ]).then(
                ([events]: [any]) => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get events
     *
     * @returns {Promise<any>}
     */
 

      /*   */

      getEvents() {
     return this.afs.collection('opgaver').stateChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Event;

        

          data.start = new Date(data.start) || startOfDay(new Date());
          data.end = new Date(data.end) || endOfDay(new Date());
          data.title = data.title || '';
          data.color = {
              primary  : data.color && data.color.primary || '#1e90ff',
              secondary: data.color && data.color.secondary || '#D1E8FF'
          };
          data.draggable = data.draggable;
          data.resizable = {
              beforeStart: data.resizable && data.resizable.beforeStart || true,
              afterEnd   : data.resizable && data.resizable.afterEnd || true
          };
          data.actions = data.actions || [];
          data.allDay = data.allDay || false;
          data.cssClass = data.cssClass || '';
          data.meta = {
              location: data.meta && data.meta.location || '',
              notes   : data.meta && data.meta.notes || ''
          };
          const id = a.payload.doc.id;
          return { ...data } ;
         
        }))
      );}
/*
    getEvents(): Promise<any>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/calendar/events')
                .subscribe((response: any) => {
                    this.events = response.data;
                    this.onEventsUpdated.next(this.events);
                    resolve(this.events);
                }, reject);
        });
    }
    */
  
    getFirestoreEvents() {
        return this.auth.user$.pipe(
          switchMap(user => {
            return this.afs
              .collection('opgaver')
              .doc(user.uid)
        
        .snapshotChanges()
          .pipe(
            map(({ payload }) => ({ ...payload.data() as {}, id: payload.id }))
          )
       })
      );
      }

    /**
     * Update events
     *
     * @param events
     * @returns {Promise<any>}
     */
    updateEvents(events): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/calendar/events', {
                id  : 'events',
                data: [...events]
            })
                .subscribe((response: any) => {
                    this.getEvents();
                }, reject);
        });
    }
 
}
