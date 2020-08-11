import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { firestore } from 'firebase/app';
import { map, switchMap } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,
  QueryDocumentSnapshot
 } from '@angular/fire/firestore';

 import { AngularFireAuth } from '@angular/fire/auth';

 import { FuseUtils } from '../utils/index'; 


@Injectable({
  providedIn: 'root'
})
export class AssistentService
 {
  contacts: any[];
  chats: any[];
  user: any;
 
  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private _httpClient: HttpClient
  ) {  }


  userCollection: AngularFirestoreCollection<any>;
  collection: any;

uid  =  this.auth.getUser();

  brugerForm = new FormGroup({
   brugerLinje: new FormControl(''),
 // orderNumber: new FormControl(''),
  // coffeeOrder: new FormControl(''),
   // completed: new FormControl(false)
  });

  get(chatId) {
    return this.afs
      .collection<any>('assistent')
      .doc(chatId)
      .snapshotChanges()
      .pipe(
        map(doc => {
          return { id: doc.payload.id, ...doc.payload.data()  as {} };
          
        })
      );
  }



  getUserChats() {
    return this.auth.user$.pipe(
      switchMap(user => {
        return this.afs
          .collection('assistent', ref => ref.where('uid', '==', user.uid))
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
 
 
  getSubjects() {
    return this.auth.user$.pipe(
      switchMap(user => {
        return this.afs
          .collection('users')
          .doc(user.uid)
    
    .snapshotChanges()
      .pipe(
        map(({ payload }) => ({ ...payload.data() as {}, id: payload.id }))
      )
   })
  );
  }

  async sendAssistantResult(chatId, assistentsvar) {
    const { uid } = await this.auth.getUser();

    const data = {
      uid,
      assistentsvar,
      createdAt: Date.now()
    }; 

    return this.afs
      .collection('assistent')
      .doc(chatId) 
      .update({
        messages: firestore.FieldValue.arrayUnion(data)
      })
  }

  async sendResult(besked) {
    const { uid } = await this.auth.getUser();

    const data = {
      uid,
      besked,
      createdAt: Date.now()
    }; 

    return this.afs
      .collection('assistent')
      .doc(uid) 
      .update({
        messages: firestore.FieldValue.arrayUnion(data)
      })
  }
 
  async create(emneId,niveau) {
    const { uid } = await this.auth.getUser();
    const chatId = FuseUtils.generateGUID(); 
    

    const data = {
      niveau,
      emneId,
      uid,
      createdAt: Date.now(),
      count: 0,
      active: true,
      messages: []
    };

    const docRef = await this.afs.collection('assistent').add(data);
   

    return this.router.navigate(['assistent', docRef.id]);
  }

  async sendMessage(chatId, brugerLinje) {
    const { uid } = await this.auth.getUser();

    const data = {
      uid,
      brugerLinje,
      createdAt: Date.now()
    };

    if (uid) {
      const ref = this.afs.collection('assistent').doc(chatId);
      return ref.update({
        messages: firestore.FieldValue.arrayUnion(data)
      });
    }
  }

  async updateMessage(chat, msg) {
    const { uid } = await this.auth.getUser();

    const ref = this.afs.collection('assistent').doc(chat.id);
    console.log(msg);
    if (chat.uid === uid || msg.uid === uid) {
      // Allowed to update
    
      return ref.update({
        messages: firestore.FieldValue.arrayUnion(msg)
      });
    }
  }
  

  async deleteMessage(chat, msg) {
    const { uid } = await this.auth.getUser();

    const ref = this.afs.collection('assistent').doc(chat.id);
    console.log(msg);
    if (chat.uid === uid || msg.uid === uid) {
      // Allowed to delete
      delete msg.user;
      return ref.update({
        messages: firestore.FieldValue.arrayRemove(msg)
      });
    }
  }

  joinUsers(chat$: Observable<any>) {
    let chat;
    const joinKeys = {};

    return chat$.pipe(
      switchMap(c => {
        // Unique User IDs
        chat = c;
        const uids = Array.from(new Set(c.messages.map(v => v.uid)));

        // Firestore User Doc Reads
        const userDocs = uids.map(u =>
          this.afs.doc(`users/${u}`).valueChanges()
        );

        return userDocs.length ? combineLatest(userDocs) : of([]);
      }),
      map(arr => {
        arr.forEach(v => (joinKeys[(<any>v).uid] = v));
        chat.messages = chat.messages.map(v => {
          return { ...v, user: joinKeys[v.uid] };
        });

        return chat;
      })
    );
  }



//Firestore CRUD actions example
async oldcreateChat() { 
  const { uid } = await this.auth.getUser();

      const chatId = FuseUtils.generateGUID(); 
const dateId = Date.now();
const count = 0;
const message = {chatid:chatId,dateId,count}

    const createchatdata = {
     // uid,

      chats: {message}
     
    };

     await this.afs.collection('assistent/').doc(uid).set(createchatdata);
}

 

  async updateSubject(subjectdata) {
      const { uid } = await this.auth.getUser();
  
      return this.afs
      .collection('users')
      .doc(uid)
      .update({  emnedata: firestore.FieldValue.arrayRemove(subjectdata)
      });
}

async createSubject(emneId, niveau) {
  const { uid } = await this.auth.getUser();

  const subjectdata = {
    emneId,
    niveau
  };

  return this.afs
  .collection('users')
  .doc(uid)
  .update({  emnedata: firestore.FieldValue.arrayUnion(subjectdata)
  });
}

async deleteChat(chatid) {
  await this.afs
    .collection('assistent')
    .doc(chatid)
    .delete();
return  this.router.navigate(['assistent']);

}


/*
updateCoffeeOrder(data) {
  return this.afs
    .collection('users')
    .doc(data.payload.doc.id)
    .set({ completed: true }, { merge: true });
}
*/
 

getMessages() {
  return this.auth.user$.pipe(
    switchMap(user => {
      return this.afs
        .collection('assistent')
        .doc(user.uid)
  
  .snapshotChanges()
    .pipe(
      map(({ payload }) => ({ ...payload.data() as {}, id: payload.id }))
    )
 })
);
}



getCoffeeOrders2() {
return this.auth.user$.pipe(
  switchMap(user => {
    return this.afs
      .collection('assistent', ref => ref.where('uid', '==', user.uid))
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

 /* 
getCoffeeOrders() {

        return this.afs.doc('beskeder/' + this.uid).snapshotChanges()
        /*
  return this.afs
  .collection('beskeder', ref => ref.where('uid', '==', user.uid))
  .snapshotChanges() 
}*/
 


getCoffeeOrdersTotal () {
return this.auth.user$.pipe(
  switchMap(user => {
    return this.afs
      .collection('assistent', ref => ref.where('uid', '==', user.uid))
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

deleteCoffeeOrder(data) {
  return this.afs
    .collection('assistent')
    .doc(data.payload.doc.id)
    .delete();
}
 



}
