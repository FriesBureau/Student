import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

@Component({
  selector: 'app-opret-bruger',
  templateUrl: './opret-bruger.component.html',
  styleUrls: ['./opret-bruger.component.scss']
})
export class OpretBrugerComponent implements OnInit {

  constructor(public auth: AuthService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore) { }

  ngOnInit(): void {
  }

}
