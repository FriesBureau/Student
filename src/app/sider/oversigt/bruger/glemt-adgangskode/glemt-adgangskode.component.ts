import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

@Component({
  selector: 'app-glemt-adgangskode',
  templateUrl: './glemt-adgangskode.component.html',
  styleUrls: ['./glemt-adgangskode.component.scss']
})
export class GlemtAdgangskodeComponent implements OnInit {

  constructor(public auth: AuthService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore) { }

  ngOnInit(): void {
  }

}
