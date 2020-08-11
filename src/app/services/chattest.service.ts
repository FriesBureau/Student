import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { firestore } from 'firebase/app';
import { FuseUtils } from '../utils';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

import { map, switchMap } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,
    QueryDocumentSnapshot
   } from '@angular/fire/firestore';

   import { AngularFireAuth } from '@angular/fire/auth';




@Injectable({
  providedIn: 'root'
})
export class ChattestService implements Resolve<any>
{
    contacts: any[];
    chats: any[];
    user: any;
    chat: any[];
    onChatSelected: BehaviorSubject<any>;
    onContactSelected: BehaviorSubject<any>;
    onChatsUpdated: Subject<any>;
    onUserUpdated: Subject<any>;
    onLeftSidenavViewChanged: Subject<any>;
    onRightSidenavViewChanged: Subject<any>;
    uid  =  this.auth.getUser();
    userCollection: AngularFirestoreCollection<any>;
    collection: any;
    

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private afs: AngularFirestore,
        private auth: AuthService,
        private afAuth: AngularFireAuth,
        private router: Router,
    )
    {
        // Set the defaults
        this.onChatSelected = new BehaviorSubject(null);
        this.onContactSelected = new BehaviorSubject(null);
        this.onChatsUpdated = new Subject();
        this.onUserUpdated = new Subject();
        this.onLeftSidenavViewChanged = new Subject();
        this.onRightSidenavViewChanged = new Subject();
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
                this.getContacts(),
                this.getChats(),
                this.getUser()
            ]).then(
                ([contacts, chats, user]) => {
                    this.contacts = contacts;
                    this.chats = chats;
                    this.user = user;
                    console.log('user name' + this.user.name); 
                    console.log('user status' + this.user.status); 
                    console.log('user chatlist id ', user.chatList); 
                    console.log('user chats', user.chats);
                    console.log('user chats dialog', user.chats.dialog);
                    console.log('user contacts', user.contacts);
                    console.log('user contact name', user.contacts.name);
                   

                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get chat
     *
     * @param contactId
     * @returns {Promise<any>}
     */

    getUserChats(contactId) {

        const chatItem = this.user.chatList.find((item) => {
            return item.contactId === contactId;
        });

        return this.auth.user$.pipe(
          switchMap(user => {
            return this.afs
              .collection('chats', ref => ref.where('uid', '==', user.chatItem.id))
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

     
    getChat(contactId): Observable<any> | Promise<any> | any
    {
        const chatItem = this.user.chatList.find((item) => {
            return item.contactId === contactId;
        });

        

        // Create new chat, if it's not created yet.
        if ( !chatItem )
        {
            this.createNewChat(contactId).then((newChats) => {
                this.getChat(contactId);
            });
            return;
        }
 
 
        return new Promise((resolve, reject) => {
      //     this._httpClient.get('api/chat-chats/' + chatItem.id)
    // this.afs.collection('chatuser').doc('f6Z2Hpg2AxcdG4URiqsCTI6xFHW2').collection('chats').valueChanges()
      // this.afs.collection('chatuser').doc('f6Z2Hpg2AxcdG4URiqsCTI6xFHW2'+ '/chats/' + 'dialog/' + chatItem.id).valueChanges()
 //  this.afs.collection('chatuser').doc('f6Z2Hpg2AxcdG4URiqsCTI6xFHW2'+ '/chats/' + 'dialog/').valueChanges()
 
 var docRef = this.afs.collection("chatuser").doc("f6Z2Hpg2AxcdG4URiqsCTI6xFHW2");
 docRef.valueChanges()
             .subscribe((response: any) => {
                    const chat = response;

                     console.log('chat response', chat);

                    const chatContact = this.user.contacts.find((contact) => {
                        return contact.id === contactId;
                    });
                    

                    const chatData = {
                        chatId : chat.id,
                        dialog : chat.dialog,
                        contact: chatContact
                    };
                    

                    this.onChatSelected.next({...chatData});
                    console.log('chatItem ID', chatItem.id);
                    console.log('chatdata fra service', chatData);

                }, reject);

        });

    }

    /**
     * Create new chat
     *
     * @param contactId
     * @returns {Promise<any>}
     */
    createNewChat(contactId): Promise<any>
    {
        return new Promise((resolve, reject) => {

            const contact = this.contacts.find((item) => {
                return item.id === contactId;
            });

            const chatId = FuseUtils.generateGUID();

            const chat = {
                id    : chatId,
                dialog: []
            };

            const chatListItem = {
                contactId      : contactId,
                id             : chatId,
                lastMessageTime: '2017-02-18T10:30:18.931Z',
                name           : contact.name,
                unread         : null
            };

            // Add new chat list item to the user's chat list
            this.user.chatList.push(chatListItem);

            // Post the created chat
            this._httpClient.post('api/chat-chats', {...chat})
                .subscribe((response: any) => {
 
                    // Post the new the user data
                    this._httpClient.post('api/chat-user/' + this.user.id, this.user)
                        .subscribe(newUserData => {

                            // Update the user data from server
                    this.getUser().then(updatedUser => {
     // this.getUser().subscribe(updatedUser => {
                                this.onUserUpdated.next(updatedUser);
                                resolve(updatedUser);
                            });
                        });
                }, reject);
        });
    }

    /**
     * Select contact
     *
     * @param contact
     */
    selectContact(contact): void
    {
        this.onContactSelected.next(contact);
    }

    /**
     * Set user status
     *
     * @param status
     */
    setUserStatus(status): void
    {
        this.user.status = status;
    }

    /**
     * Update user data
     *
     * @param userData
     */
    updateUserData(userData): void
    {
        this._httpClient.post('api/chat-user/' + this.user.id, userData)
            .subscribe((response: any) => {
                    this.user = userData;
                }
            );
    }

    /**
     * Update the chat dialog
     *
     * @param chatId
     * @param dialog
     * @returns {Promise<any>}
     */
    updateDialog(chatId, dialog): Promise<any>
    {
        return new Promise((resolve, reject) => {

            const newData = {
                id    : chatId,
                dialog: dialog
            };

            this._httpClient.post('api/chat-chats/' + chatId, newData)
                .subscribe(updatedChat => {
                    resolve(updatedChat);
                }, reject);
        });
    }

    /**
     * Get contacts
     *
     * @returns {Promise<any>}
     */
    getContacts(): Promise<any>
    {
        return new Promise((resolve, reject) => {
        //        this._httpClient.get('api/chat-contacts')
          this.afs.collection('chatuser').doc('f6Z2Hpg2AxcdG4URiqsCTI6xFHW2').collection('contacts').valueChanges()

                .subscribe((response: any) => {
                    resolve(response);

                    console.log('Get contacts', response);

                }, reject);
        });
    }

    /**
     * Get chats
     *
     * @returns {Promise<any>}
     */
   /*
    getChats(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            var docRef = this.afs.collection("chatuser").doc("f6Z2Hpg2AxcdG4URiqsCTI6xFHW2");
    
    docRef.valueChanges().subscribe((response: any) =>  {
        resolve(response);
        console.log('Get chats response', response)
    }, reject);
    });
    } 
*/
 
    getChats(): Promise<any>
    {
        return new Promise((resolve, reject) => {
      //      this._httpClient.get('api/chat-chats')
     this.afs.collection('chatuser').doc('f6Z2Hpg2AxcdG4URiqsCTI6xFHW2').collection('chats').valueChanges()
        //  this.afs.collection('chatuser').doc('f6Z2Hpg2AxcdG4URiqsCTI6xFHW2').valueChanges()
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Get user
     *
     * @returns {Promise<any>}
     */
  /*
    getUser() {
         let db = this.firebase.firestore();
    var sfDocRef = db.collection("cities").doc("SF");
        var docRef = db.collection("chatuser").doc("f6Z2Hpg2AxcdG4URiqsCTI6xFHW2");

docRef.get().subscribe(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
});
    }
  */

 

    getUser(): Promise<any>
    {
        return new Promise((resolve, reject) => {
   var docRef = this.afs.collection("chatuser").doc("f6Z2Hpg2AxcdG4URiqsCTI6xFHW2");
    docRef.valueChanges().subscribe((response: any) =>  {
        resolve(response);
        console.log('Get user response', response)
    }, reject);
    });
    } 
  /*
    getUser(): Promise<any>
    {
        return new Promise((resolve, reject) => {
          this._httpClient.get('api/chat-user')
        //     this.afs.collection('chatuser').doc('f6Z2Hpg2AxcdG4URiqsCTI6xFHW2').valueChanges()
                .subscribe((response: any) => {
                    resolve(response[0]);
                }, reject);
        });
    }
        */


  
          

 
   
}
