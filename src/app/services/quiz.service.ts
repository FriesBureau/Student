import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class QuizService {

  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore) { }

  get(url: string) {

  return this.http.get(url);

  //    return this.firestore.collection('lektioner').snapshotChanges();

  }

  getAll() { 
    return [
      { id: '../../../../assets/data/alfabet.json', name: 'Lyde - Alfabet' },
      { id: '../../../../assets/data/vokaler.json', name: 'Ord - Vokaler' },
      { id: '../../../../assets/data/konsonanter.json', name: 'Ord - Konsonanter' },
      { id: '../../../../assets/data/udtale.json', name: 'Ord - Udtale' }
    ]; 
        /*
    return this.firestore.collection('lektioner').snapshotChanges();
     */

  }

  getAllQuestions() {

    /*
  return [
    { id: '../../../../assets/data/lyde.json', name: 'Lyde og ord' },
    { id: '../../../../assets/data/lektion1.json', name: 'Lektion 1' },
    { id: '../../../../assets/data/lektion2.json', name: 'Lektion 2' },
    { id: '../../../../assets/data/lektion3.json', name: 'Lektion 3' },
    { id: '../../../../assets/data/lektion4.json', name: 'Lektion 4' }
  ]; 
    */
  return this.firestore.collection('lektioner').snapshotChanges();

}

}
