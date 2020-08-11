import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

@Component({
  selector: 'app-bruger',
  templateUrl: './bruger.component.html',
  styleUrls: ['./bruger.component.scss']
})
export class BrugerComponent implements OnInit {

  constructor(public auth: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore) { }

  ngOnInit() {
  }


deleteUser () {
  this.afs.doc('users/' + this.afAuth.auth.currentUser.uid).delete()
   .then((result) => {
   console.log('bruger er slettet');
   this.router.navigate(['oversigt']);
 
  }).catch((error) => {
    window.alert(error.message)
  })
  }

}
