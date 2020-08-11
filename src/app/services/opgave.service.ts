import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';

import { AuthService } from './auth.service';
import { Router } from '@angular/router'; 
import { firestore } from 'firebase/app';
import { map, switchMap, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,
  QueryDocumentSnapshot
 } from '@angular/fire/firestore';

 import { AngularFireAuth } from '@angular/fire/auth';

 import { Event} from '../model/event.model';
 import { startOfDay, isSameDay, endOfDay, isSameMonth } from 'date-fns';

import { FuseUtils } from '../utils/';

import { Opgave } from '../model/opgave.model';

@Injectable({
  providedIn: 'root'
})
 
export class OpgaveService implements Resolve<any>
{
    opgaver: Opgave[];
    selectedOpgaver: Opgave[]; 
    currentOpgave: Opgave; 
    searchText: string;
    filters: any[];
    tags: any[];
    routeParams: any;
    opgave$: Observable<any>;

    onOpgaverChanged: BehaviorSubject<any>;
    onSelectedOpgaverChanged: BehaviorSubject<any>;
    onCurrentOpgaveChanged: BehaviorSubject<any>;
    onFiltersChanged: BehaviorSubject<any>;
    onTagsChanged: BehaviorSubject<any>;
    onSearchTextChanged: BehaviorSubject<any>;
    onNewOpgaveClicked: Subject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     * @param {Location} _location
     */ 
    constructor(
        private _httpClient: HttpClient,
        public _location: Location,
        private afs: AngularFirestore,
        private auth: AuthService,
        
    )
    {
        // Set the defaults
        this.selectedOpgaver = [];
        this.searchText = '';
        this.onOpgaverChanged = new BehaviorSubject([]);
        this.onSelectedOpgaverChanged = new BehaviorSubject([]);
        this.onCurrentOpgaveChanged = new BehaviorSubject([]);
        this.onFiltersChanged = new BehaviorSubject([]);
        this.onTagsChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new BehaviorSubject('');
        this.onNewOpgaveClicked = new Subject();

    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getFilters(),
                this.getTags(),
                this.getOpgaver()
            ]).then(
                () => {
                    if ( this.routeParams.opgaveId )
                    {
                        this.setCurrentOpgave(this.routeParams.opgaveId);
                        this.getUserOpgave(this.routeParams.opgaveId);
                    }
                    else
                    {
                        this.getUserOpgave(null);
                        this.setCurrentOpgave(null);
                    }

                    this.onSearchTextChanged.subscribe(searchText => {
                        if ( searchText !== '' )
                        {
                            this.searchText = searchText;
                            this.getOpgaver();
                        }
                        else
                        {
                            this.searchText = searchText;
                            this.getOpgaver();
                        }
                    });
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get all filters
     *
     * @returns {Promise<any>}
     */
    getFilters(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/opgave-filters')
                .subscribe((response: any) => {
                    this.filters = response;
                    this.onFiltersChanged.next(this.filters);
                    resolve(this.filters);
                }, reject);
        });
    }

    /**
     * Get all tags
     *
     * @returns {Promise<any>}
     */


    getTags(): Promise<any> 
    {
        return new Promise((resolve, reject) => {

       this.afs.collection('tags').valueChanges()
           // this._httpClient.get('api/opgave-tags')
                .subscribe((response: any) => {
                    this.tags = response;
                    this.onTagsChanged.next(this.tags);
                    resolve(this.tags);
                }, reject);
        }); 
    }

    /**
     * Get opgaver
     *
     * @returns {Promise<Opgave[]>}
     */


      
 
   

    getOpgaver(): Promise<Opgave[]>
    {
        if ( this.routeParams.tagHandle )
        {
            return this.getOpgaverByTag(this.routeParams.tagHandle);
        }

        if ( this.routeParams.filterHandle )
        {
            return this.getOpgaverByFilter(this.routeParams.filterHandle);
        }

        return this.getOpgaverByParams(this.routeParams);
    }

    /**
     * Get opgaver by params
     *
     * @param handle
     * @returns {Promise<Opgave[]>}
     */
  async getOpgaverByParams(handle): Promise<Opgave[]>
    {
        return await new Promise((resolve, reject) => {

            this.afs.collection('opgaver').valueChanges()
//            this._httpClient.get('api/opgave-opgaver')
                .subscribe((opgaver: any) => {
                    this.opgaver = opgaver.map(opgave => {

                       
                        return new Opgave(opgave);
                 
                      
                    });

                 

                    this.opgaver = FuseUtils.filterArrayByString(this.opgaver, this.searchText);

                    this.onOpgaverChanged.next(this.opgaver);

                    resolve(this.opgaver);
                });
        });
    }

    /**
     * Get opgaver by filter
     *
     * @param handle
     * @returns {Promise<Opgave[]>}
     */
    getOpgaverByFilter(handle): Promise<Opgave[]>
    {

        let param = handle + '=true';

        if ( handle === 'end' )
        {
            param = handle + '=^$|\\s+';
        }

        return new Promise((resolve, reject) => {

            this.afs.collection('opgaver', ref => ref.where(handle, '==', true)).valueChanges()

        //    this._httpClient.get('api/opgave-opgaver?' + param)
                .subscribe((opgaver: any) => {

                    this.opgaver = opgaver.map(opgave => {
                        return new Opgave(opgave);
                    });

                    this.opgaver = FuseUtils.filterArrayByString(this.opgaver, this.searchText);

                    this.onOpgaverChanged.next(this.opgaver);

                    resolve(this.opgaver);

                }, reject);
        });
    }

    /**
     * Get opgaver by tag
     *
     * @param handle
     * @returns {Promise<Opgave[]>}
     */
   async getOpgaverByTag(handle): Promise<Opgave[]>
    {
        return await new Promise((resolve, reject) => {
          //    this.afs.collection('tags').snapshotChanges()
          this._httpClient.get('api/opgave-tags?handle=' + handle)
                .subscribe((tags: any) => {


                 //      const tagId = tags.id;
                 const tagId = tags[0].id;
                  //     this.afs.collection('opgaver').snapshotChanges(tagId)
                this._httpClient.get('api/opgave-opgaver?tags=' + tagId)
                        .subscribe((opgaver: any) => {

                            this.opgaver = opgaver.map(opgave => {
                                return new Opgave(opgave);
                            });

                            this.opgaver = FuseUtils.filterArrayByString(this.opgaver, this.searchText);

                            this.onOpgaverChanged.next(this.opgaver);

                            resolve(this.opgaver);

                        }, reject);
                });
        });
    }

    /**
     * Toggle selected opgave by id
     *
     * @param id
     */
    toggleSelectedOpgave(id): void
    {
        // First, check if we already have that opgave as selected...
        if ( this.selectedOpgaver.length > 0 )
        {
            for ( const opgave of this.selectedOpgaver )
            {
                // ...delete the selected opgave
                if ( opgave.id === id )
                {
                    const index = this.selectedOpgaver.indexOf(opgave);

                    if ( index !== -1 )
                    {
                        this.selectedOpgaver.splice(index, 1);

                        // Trigger the next event
                        this.onSelectedOpgaverChanged.next(this.selectedOpgaver);

                        // Return
                        return;
                    }
                }
            }
        }

        // If we don't have it, push as selected
        this.selectedOpgaver.push(
            this.opgaver.find(opgave => {
                return opgave.id === id;
            })
        );

        // Trigger the next event
        this.onSelectedOpgaverChanged.next(this.selectedOpgaver);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void
    {
        if ( this.selectedOpgaver.length > 0 )
        {
            this.deselectOpgaver();
        }
        else
        {
            this.selectOpgaver();
        }

    }

    /**
     * Select opgaver
     *
     * @param filterParameter
     * @param filterValue
     */
    selectOpgaver(filterParameter?, filterValue?): void
    {
        this.selectedOpgaver = [];

        // If there is no filter, select all opgaver
        if ( filterParameter === undefined || filterValue === undefined )
        {
            this.selectedOpgaver = this.opgaver;
        }
        else
        {
            this.selectedOpgaver.push(...
                this.opgaver.filter(opgave => {
                    return opgave[filterParameter] === filterValue;
                })
            );
        }

        // Trigger the next event
        this.onSelectedOpgaverChanged.next(this.selectedOpgaver);
    }

    /**
     * Deselect opgaver
     */
    deselectOpgaver(): void
    {
        this.selectedOpgaver = [];

        // Trigger the next event
        this.onSelectedOpgaverChanged.next(this.selectedOpgaver);
    }
  /**
     * Get User Opgave by id
     *
     * @param id
     */
 
     

    getUserOpgave(id) {
this.opgave$ =  this.afs.doc<Opgave>(`opgaver/${id}`).valueChanges();
    console.log('Her er jeg',id);
    
  }


  async setCurrentOpgave(id)
    {

        this.currentOpgave = this.opgaver.find(opgave => {
            return opgave.id === id;
        });

        this.onCurrentOpgaveChanged.next([this.currentOpgave, 'edit']);

        const tagHandle    = this.routeParams.tagHandle,
              filterHandle = this.routeParams.filterHandle;

        if ( tagHandle )
        {
            this._location.go('opgave/tag/' + tagHandle + '/' + id);
        }
        else if ( filterHandle )
        {
            this._location.go('opgave/filter/' + filterHandle + '/' + id);
        }
        else
        {
            this._location.go('opgave/all/' + id);
        }

        
 
 
    }



    /**
     * Toggle tag on selected opgaver
     *
     * @param tagId
     */
    toggleTagOnSelectedOpgaver(tagId): void
    {
        this.selectedOpgaver.map(opgave => {
            this.toggleTagOnOpgave(tagId, opgave);
        });
    }

    /**
     * Toggle tag on opgave
     *
     * @param tagId
     * @param opgave
     */
    toggleTagOnOpgave(tagId, opgave): void
    {
        const index = opgave.tags.indexOf(tagId);
        if ( index !== -1 )
        {
            opgave.tags.splice(index, 1);
        } 
        else
        {
            opgave.tags.push(tagId);
        }
        this.updateOpgave(opgave);
    }

    /**
     * Has tag?
     *
     * @param tagId
     * @param opgave
     * @returns {boolean}
     */
    hasTag(tagId, opgave): any
    {
        if ( !opgave.tags )
        {
            return false;
        }

        return opgave.tags.indexOf(tagId) !== -1;
    }

      /*
     * Hent opgaver
     *
     */
 

      /*
     * Hent opgave på id
     *
     */

    getOpgaveID() {
        return this.afs.collection('opgaver').stateChanges().pipe(
           map(actions => actions.map(a => {
             const id = a.payload.doc.id;
             return { id } ;
          
           }))
         );}

   

      /*
     * Opret opgave
     *
     */

     async createsyncopgave (data) {
    const { uid } = await this.auth.getUser();
    const docRef = await this.afs.collection('opgaver').add(data);
    const docRefData = docRef.id;
   // alert(docRef.id);
   
    const iddata =  {
        uid: uid,
        id: docRefData,
        
        
}

  return this.afs.collection('opgaver').doc(docRefData).update(iddata);
//  return  this._location.go('opgave/all/' + docRefData);
// return  this._location.go('opgave/all');
  }

    async create(opgaveid, data){
        const { uid } = await this.auth.getUser();  
        return await this.afs.collection('opgaver').doc(opgaveid).set(data)
          .then((ref) => {
            console.log(ref)

const uiddata =  {
          uid,
}

this.afs.collection('opgaver').doc(opgaveid).update(uiddata);

return this.afs.collection('opgaver').doc(opgaveid).update(uiddata);

          })
         
      }
    
    /*
     * Slet opgave
     *
     */
    async deleteOpgave(opgaveid) {
    return await this.afs
            .collection('opgaver')
            .doc(opgaveid)
            .delete();
 
}

    /*
     * Opdater boolean opgaver
     *
     */

    async toggleupdateOpgaveStarred(opgaveid, starred){
        return await this.afs
        .collection("opgaver")
        .doc(opgaveid)
        .set({ starred: starred}, { merge: true });
              }

    async toggleupdateOpgaveImportant(opgaveid, important){
        return await this.afs
        .collection("opgaver")
        .doc(opgaveid)
        .set({ important: important}, { merge: true });
              }
 
              async toggleupdateOpgaveCompleted(opgaveid, completed){
                return await this.afs
                .collection("opgaver")
                .doc(opgaveid)
                .set({ completed: completed}, { merge: true });
                      }

    async updateOpgave(opgave: any){
 
        return this.afs.collection('opgaver').doc(opgave.id).update(opgave)
           
                 
              }
              /*
    updateOpgave(opgave): any
    {
        return new Promise((resolve, reject) => {
 
            this._httpClient.post('api/opgave-opgaver/' + opgave.id, {...opgave})
                .subscribe(response => {

                    this.getOpgaver().then(opgaver => {

                        resolve(opgaver);

                    }, reject);
                });
        });
    }
    */
}
