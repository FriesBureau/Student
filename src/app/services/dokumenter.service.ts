import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { map, switchMap } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';


import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,
    QueryDocumentSnapshot
   } from '@angular/fire/firestore';
   import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';
  

@Injectable({
  providedIn: 'root'
})
export class DokumenterService implements Resolve<any>
{
    onFilesChanged: BehaviorSubject<any>;
    onFileSelected: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private afs: AngularFirestore,
        private auth: AuthService,
        private storage: AngularFireStorage, 
    )
    {
        // Set the defaults
        this.onFilesChanged = new BehaviorSubject({});
        this.onFileSelected = new BehaviorSubject({});
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
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getFiles()
            ]).then(
                ([files]) => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get files
     *
     * @returns {Promise<any>}
     */
    async getFiles(): Promise<any>
    {
        const { uid } = await this.auth.getUser();

        return new Promise((resolve, reject) => {
//            this._httpClient.get('api/file-manager') 
        this.afs
        .collection('dokumenter', ref => ref.where('uid', '==', uid))
        
        .valueChanges()
                .subscribe((response: any) => {
                    this.onFilesChanged.next(response);
                    this.onFileSelected.next(response[0]);
                    resolve(response);
                }, reject);
        }); 
    }

    hentlyd() {
            return this.auth.user$.pipe(
              switchMap(user => {
                return this.afs
                  .collection('dokumenter', ref => ref.where('uid', '==', user.uid))
                  .snapshotChanges()
                  .pipe(
                    map(actions => {
                      return actions.map(a => {
                        const data: Object = a.payload.doc.data();
                        const id = a.payload.doc.id;
                        return { id, ...data };
                      });
                    })
                  );
              })
            );
    }

    async deleteDokument(firestoragepath, dokumentid) {
    
this.storage.ref(firestoragepath).delete();

        return await this.afs
                .collection('dokumenter')
                .doc(dokumentid)
                .delete();
     
    }

}
