import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { map, switchMap, tap } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import { Projekt } from '../model/projekt.model'
import { ProjektListe } from '../model/projektliste.model'
import { Subject} from 'rxjs';



import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,
    QueryDocumentSnapshot
   } from '@angular/fire/firestore';
   import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjektService implements Resolve<any> {

    boards: any[];
    routeParams: any;
    board: any;

    onBoardsChanged: BehaviorSubject<any>;
    onBoardChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private afs: AngularFirestore,
        private auth: AuthService
    )
    {
        // Set the defaults
        this.onBoardsChanged = new BehaviorSubject([]);
        this.onBoardChanged = new BehaviorSubject([]);
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
                this.getBoards()
            ]).then(
                () => {
                    resolve();
                },
                reject
            ); 
        });
    }

    /**
     * Get boards
     *
     * @returns {Promise<any>}
     */

     /*
    async getEvents() {
        return this.afs.collection('projekt').stateChanges().pipe(
           map(actions => actions.map(a => {
             const data = a.payload.doc.data() as Projekt;
        
             const id = a.payload.doc.id;
          
             this.onBoardsChanged.next(data);
         
            
           }))
         );} */

   async getBoards(): Promise<any>
    
    {
        const { uid } = await this.auth.getUser();

        return new Promise((resolve, reject) => {
        this.afs.collection('projekt').valueChanges() 
        //        this._httpClient.get('api/scrumboard-boards')
                .subscribe((response: any) => {
                    this.boards = response;
                    this.onBoardsChanged.next(this.boards);
                    resolve(this.boards);
                }, reject);
        });
    } 

    /**
     * Get board
     *
     * @param boardId
     * @returns {Promise<any>}
     */

    getBoardData(boardId) {
   
            return this.afs
              .collection('projekt')
              .doc(boardId)
              .valueChanges();
      }

      getUserLists() {
        return this.auth.user$.pipe(
          switchMap(user => {
            return this.afs
              .collection('projektliste', ref => ref.where('uid', '==', user.uid))
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
     

      getListData(boardId) {
        return this.afs
        .collection('projektliste')
        .doc(boardId)
        .valueChanges();
                  }


                  get(boardId) {
                    return this.afs
                      .collection<any>('projekt')
                      .doc(boardId)
                      .snapshotChanges()
                      .pipe(
                        map(doc => {
                          return { id: doc.payload.id, ...doc.payload.data()  as {} };
                          
                        })
                      );
                  }


  joinLists(list$: Observable<any>) {
    let list;
    const joinKeys = {};

    return list$.pipe(
      switchMap(c => {
        // Unique User IDs
        list = c;
        const uids = Array.from(new Set(c.lists.map(v => v.uid)));

        // Firestore User Doc Reads
        const userDocs = uids.map(u =>
          this.afs.doc(`users/${u}`).valueChanges()
        );

        return userDocs.length ? combineLatest(userDocs) : of([]);
      }),
      map(arr => {
        arr.forEach(v => (joinKeys[(<any>v).uid] = v));
        list.lists = list.lists.map(v => {
          return { ...v, user: joinKeys[v.uid] };
        });

        return list;
      })
    );
  }


  joinCards(card$: Observable<any>) {
    let card;
    const joinKeys = {};

    return card$.pipe(
      switchMap(c => {
        // Unique User IDs
        card = c;
        const uids = Array.from(new Set(c.cards.map(v => v.uid)));

        // Firestore User Doc Reads
        const userDocs = uids.map(u =>
          this.afs.doc(`users/${u}`).valueChanges()
        );

        return userDocs.length ? combineLatest(userDocs) : of([]);
      }),
      map(arr => {
        arr.forEach(v => (joinKeys[(<any>v).uid] = v));
        card.card = card.cards.map(v => {
          return { ...v, user: joinKeys[v.uid] };
        });

        return card;
      })
    );
  }

    /**
     * Add card
     *
     * @param listId
     * @param newCard
     * @returns {Promise<any>}
     */
    addCard(listId, newCard): Promise<any>
    {
        this.board.lists.map((list) => {
            if ( list.id === listId )
            {
                return list.idCards.push(newCard.id);
            }
        });

        this.board.cards.push(newCard);

        return this.updateBoard();
    }

    /**
     * Add list
     *
     * @param newList
     * @returns {Promise<any>}
     */
    addList(newList): Promise<any>
    {
        this.board.lists.push(newList);

        return this.updateBoard();
    }

    /**
     * Remove list
     *
     * @param listId
     * @returns {Promise<any>}
     */
    removeList(listId): Promise<any>
    {
        const list = this.board.lists.find((_list) => {
            return _list.id === listId;
        });

        for ( const cardId of list.idCards )
        {
            this.removeCard(cardId);
        }

        const index = this.board.lists.indexOf(list);

        this.board.lists.splice(index, 1);

        return this.updateBoard();
    }

    /**
     * Remove card
     *
     * @param cardId
     * @param listId
     */
    removeCard(cardId, listId?): void
    {
        const card = this.board.cards.find((_card) => {
            return _card.id === cardId;
        });

        if ( listId )
        {
            const list = this.board.lists.find((_list) => {
                return listId === _list.id;
            });
            list.idCards.splice(list.idCards.indexOf(cardId), 1);
        }

        this.board.cards.splice(this.board.cards.indexOf(card), 1);

        this.updateBoard();
    }

    /**
     * Update board
     *
     * @returns {Promise<any>}
     */
    updateBoard(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/scrumboard-boards/' + this.board.id, this.board)
                .subscribe(response => {
                    this.onBoardChanged.next(this.board);
                    resolve(this.board);
                }, reject);
        });
    }

    /**
     * Update card
     *
     * @param newCard
     */
    updateCard(newCard): void
    {
        this.board.cards.map((_card) => {
            if ( _card.id === newCard.id )
            {
                return newCard;
            }
        });

        this.updateBoard();
    }

    /**
     * Create new board
     *
     * @param board
     * @returns {Promise<any>}
     */
    createNewBoard(board): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/scrumboard-boards/' + board.id, board)
                .subscribe(response => {
                    resolve(board);
                }, reject);
        });
    }
}

@Injectable()
export class BoardResolve implements Resolve<any>
{
 
    constructor(
        private projektservice: ProjektService
    )
    {
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @returns {Promise<any>}
     */
    resolve(route: ActivatedRouteSnapshot) 
    {
  
      
    }
}
