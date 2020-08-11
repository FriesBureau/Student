import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';


import { first, map } from 'rxjs/operators';

import { switchMap } from 'rxjs/operators';
import { User } from '../model/user.model';

declare var gapi: any;

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<any>;
  userData: any; // Save logged in user data
  calendarItems: any[];

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public ngZone: NgZone 
  ) {
//    this.initClient();
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
          return of(null);
        }
      })
    );

  }

   // Initialize the Google API client with desired scopes

/*   initClient() {
    gapi.load('client', () => {
      console.log('loaded client')

      // It's OK to expose these credentials, they are client safe.
      gapi.client.init({
        apiKey: 'AIzaSyAPQ6AmOFp6EMOgnaLsWQvGAr0_3oErza0',
        clientId: '871555612680-gkcnftt5hegkf59t77n5nnvf0p21d9bn.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar'
      })

      gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'));

    });
   }
      */

    // Returns true when user is looged in and email is verified
    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      
      return (user.emailVerified !== false) ? true : false;
    
    }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => { 
          this.router.navigate(['dashboard']);
        });
        this.updateUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }


    // Sign up with email/password
    SignUp(email:string, password: string, fullname: string, avatar: string){
      return new Promise((resolve, reject) => {
        this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => {
          userData.user.updateProfile({
         //   displayName: fullname,
            displayName: fullname,
            photoURL: avatar
          }).then(() => {
            this.SendVerificationMail();
            this.updateUserData(userData.user);
            resolve(userData);
          }); 
        },
        err => reject(err))
      });
    }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email-address']);
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }


  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }


  async loginwithGoogleandCalendar() {
    const googleAuth = gapi.auth2.getAuthInstance()
    const googleUser = await googleAuth.signIn();

    const token = googleUser.getAuthResponse().id_token;

    console.log(googleUser)

    const credential = auth.GoogleAuthProvider.credential(token);

    await this.afAuth.auth.signInAndRetrieveDataWithCredential(credential);


    // Alternative approach, use the Firebase login with scopes and make RESTful API calls

    // const provider = new auth.GoogleAuthProvider()
    // provider.addScope('https://www.googleapis.com/auth/calendar');

    // this.afAuth.auth.signInWithPopup(provider)
    return this.updateUserData(googleUser.user);
    
  }

  async sendAvatar(avatar) {
    alert(avatar);
    return this.updateUserData(avatar.user);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['oversigt']);
  }
 
  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName, 
      photoURL: user.photoURL,
      brugerrolle: 'demo',
      emailVerified: user.emailVerified,
      emnedata: [{"emneId" :"Om mig", "niveau":1}],
      
    };

    return userRef.set(data, { merge: true });

  }

  getUser() {
    return this.user$.pipe(first()).toPromise();
  }

  getCurrentUser(): Promise<string> {
    var promise = new Promise<string>((resolve, reject) => {
      this.afAuth.auth.onAuthStateChanged(returnedUser => {
        if (returnedUser) {
          resolve(returnedUser.uid);
        } else {
          reject(null);
        } 
      });
    })
    return promise
  }


  async getCalendar() { 
    const events = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime'
    })

    console.log(events)

    this.calendarItems = events.result.items;
  
  }

  async insertEvent() {
    const insert = await gapi.client.calendar.events.insert({
      calendarId: 'primary',
      start: {
        dateTime: hoursFromNow(2),
        timeZone: 'America/Los_Angeles'
      }, 
      end: {
        dateTime: hoursFromNow(3),
        timeZone: 'America/Los_Angeles'
      }, 
      summary: 'Have Fun!!!',
      description: 'Do some cool stuff and have a fun time doing it'
    })

    await this.getCalendar();
  }
}
const hoursFromNow = (n) => new Date(Date.now() + n * 1000 * 60 * 60 ).toISOString();
