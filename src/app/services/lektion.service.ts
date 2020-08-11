import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import {DocumentChangeAction} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { User } from '../model/user.model';
import { Lektion, Svar } from '../model/lektion.model';

import { AuthService } from './auth.service';

import * as firebase from 'firebase/app';
import { switchMap, map } from 'rxjs/operators';
import { first } from 'rxjs/operators';
import { Interface } from 'readline';
import { firestore } from 'firebase/app';
import { combineLatest } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

import { AngularFirestoreCollection,
  QueryDocumentSnapshot
 } from '@angular/fire/firestore';


export interface Data {
  niveauid?: string;

}

@Injectable({
  providedIn: 'root'
})
 

export class LektionService {
  user$: Observable<any>;
 
 
 

  constructor(private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private auth: AuthService,
    private afs: AngularFirestore,
 
 
    ) {   
    }

  form = new FormGroup({
    customerName: new FormControl(''),
    orderNumber: new FormControl(''),
    coffeeOrder: new FormControl(''),
    completed: new FormControl(false)
  });
 

   
 

    /**
   * Get all boards owned by current user
*/
getUserQuestions() {
  return this.auth.user$.pipe(
    switchMap(user => {
      if (user.brugerrolle === 'demo') {
        return this.afs
          .collection<Lektion>('lektioner', ref =>
            ref
            .where('uid', "array-contains-any", ["uid", user.uid]).orderBy('trin').limit(1)

          )
          .valueChanges({ idField: 'id' }); 
      } else {
        return this.afs
        .collection<Lektion>('lektioner', ref =>
          ref

          .where("trin", ">", "0")
          .orderBy("trin", "desc").limit(1)

        )
        .valueChanges({idField: 'trinid'})
      }
    }),
  );
}

async removeQuestion(trinid) {
  const { uid } = await this.auth.getUser();
  return this.afs
  .collection('lektioner')
  .doc(trinid)
  .update({  uid: firestore.FieldValue.arrayRemove(uid)
  });
}

async createQuestion(nexttrin) {
const { uid } = await this.auth.getUser();
const nyttrin  =  1;

const subjectdata = {
  nyttrin,
};

return this.afs
.collection('lektioner')
.doc(nexttrin)
.update({  uid: firestore.FieldValue.arrayUnion(uid)
});
}

async opdaterResultat(trin, resultat) {
  const { uid } = await this.auth.getUser();
  const point = resultat; // jeg kan evt. lave nogle udregninger her ift. svartid mv.

const subjectdata = {
  point,
  trin
};

return this.afs
.collection('data')
.doc(uid)
.update({  resultater: firestore.FieldValue.arrayUnion(subjectdata)
});

}


  /**
   * Creates a new board for the current user
   */
  async createBoard(data: Lektion) {
    const user = await this.afAuth.auth.currentUser;
    return this.afs.collection('lektioner').doc(data.trin).set({
      ...data,
      uid: [user.uid],
      svar: [{ svar: 'Svar 1', label: 'yellow' }]
    });
  }
 
  hentBrugerTrin() {
    return this.auth.user$.pipe(
      switchMap(user => {
        if (user) {
          return this.afs
            .collection<Lektion>('lektioner', ref =>
              ref
  
              .where("trin", ">", "0")
              .orderBy("trin", "desc").limit(1)
  
            )
            .valueChanges({idField: 'trinid'})
        }  
      }),
    );
  }

 
 

  /**
   * Run a batch write to change the priority of each board for sorting
   */
  sortBoards(boards: Lektion[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = boards.map(b => db.collection('lektioner').doc(b.id));
    refs.forEach((ref, idx) => batch.update(ref, { trin: idx }));
    batch.commit();
  }

  /**
   * Delete board
   */
  deleteBoard(boardId: string) {
    return this.afs
      .collection('lektioner')
      .doc(boardId)
      .delete();
  }

  /**
   * Updates the tasks on board
   */
  updateSvar(boardId: string, svar: Svar[]) {
    return this.afs
      .collection('lektioner')
      .doc(boardId)
      .update({ svar });
  }

  /**
   * Remove a specifc task from the board
   */
  removeSvar(boardId: string, svar: Svar) {
    return this.afs
      .collection('lektioner')
      .doc(boardId)
      .update({
        svar: firebase.firestore.FieldValue.arrayRemove(svar)
      });
  }

 
}
