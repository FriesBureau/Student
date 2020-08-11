import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

@Component({
  selector: 'app-email-godkendelse',
  templateUrl: './email-godkendelse.component.html',
  styleUrls: ['./email-godkendelse.component.scss']
})
export class EmailGodkendelseComponent implements OnInit {

  constructor(public auth: AuthService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore) { }

  ngOnInit(): void {
  }

}
