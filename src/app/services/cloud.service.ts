// src/app/services/cloud.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { DokumenterService } from './dokumenter.service';


@Injectable({
  providedIn: 'root'
})
export class CloudService {

  constructor(
    private http: HttpClient,
    private dokumenterservice: DokumenterService,

    private firestore: AngularFirestore) { }
 

  lydfiler: any = [
         // tslint:disable-next-line: max-line-length
         {
          url:
            '../../assets/lyd/001.mp3',
          name: 'Det danske alfabet',
          artist: ' Lektion 1' 
        },
       // tslint:disable-next-line: max-line-length
       {
        url:
          'https://story.friesbureau.dk/lyd/Doeden_i_Visby/track_002.mp3',
        name: 'Syng alfabetet',
        artist: ' Lektion 1' 
      },
    // tslint:disable-next-line: max-line-length
    {
      url:
        '../../assets/lyd/003.mp3',
      name: 'Familie',
      artist: ' Lektion 1' 
    },
    {
      // tslint:disable-next-line: max-line-length
      url:
      '../../assets/lyd/004.mp3',
            name: 'Dialog 1',
      artist: 'Lektion 1'
    },
    {
      url:
      '../../assets/lyd/005.mp3',
            name: '1 til 10',
      artist: 'Lektion 1'
    },
    {
      url:
      '../../assets/lyd/006.mp3',
            name: 'Dialog 2',
      artist: 'Lektion 1'
    },
    {
      url:
      '../../assets/lyd/007.mp3',
            name: 'Tekst 2',
      artist: 'Lektion 1'
    },
    {
      url:
      '../../assets/lyd/008.mp3',
            name: 'Lyt 1',
      artist: 'Lektion 1'
    },
    {
      url:
      '../../assets/lyd/009.mp3',
            name: 'Lyt 2',
      artist: 'Lektion 1'
    }
  ];
  radiokanaler: any = [
    // tslint:disable-next-line: max-line-length
    {
      url:
        'http://live-icy.gss.dr.dk:8000/A/A03H.mp3',
      name: 'P1',
      artist: ' DR' 
    },
    {
      url:
        'http://live-icy.gss.dr.dk:8000/A/A04H.mp3',
      name: 'P2',
      artist: ' DR' 
    },
    {
      url:
        'http://live-icy.gss.dr.dk:8000/A/A05H.mp3',
      name: 'P3',
      artist: ' DR' 
    },
    {
      url:
        'http://live-icy.gss.dr.dk:8000/A/A08H.mp3',
      name: 'P4 København',
      artist: ' DR' 
    }
  ];

  lyde: any = [
    // tslint:disable-next-line: max-line-length
    {
     url:
       '../../assets/lyd/001.mp3',
     name: 'Det danske alfabet',
     artist: ' Lektion 1' 
   },
  // tslint:disable-next-line: max-line-length
  {
   url:
     'https://story.friesbureau.dk/lyd/Doeden_i_Visby/track_002.mp3',
   name: 'Syng alfabetet',
   artist: ' Lektion 1' 
 },
// tslint:disable-next-line: max-line-length
{
 url:
   '../../assets/lyd/003.mp3',
 name: 'Familie',
 artist: ' Lektion 1' 
},
{
 // tslint:disable-next-line: max-line-length
 url:
 '../../assets/lyd/004.mp3',
       name: 'Dialog 1',
 artist: 'Lektion 1'
},
{
 url:
 '../../assets/lyd/005.mp3',
       name: '1 til 10',
 artist: 'Lektion 1'
},
{
 url:
 '../../assets/lyd/006.mp3',
       name: 'Dialog 2',
 artist: 'Lektion 1'
},
{
 url:
 '../../assets/lyd/007.mp3',
       name: 'Tekst 2',
 artist: 'Lektion 1'
},
{
 url:
 '../../assets/lyd/008.mp3',
       name: 'Lyt 1',
 artist: 'Lektion 1'
},
{
 url:
 '../../assets/lyd/009.mp3',
       name: 'Lyt 2',
 artist: 'Lektion 1'
}
];

  get(url: string) {

    return this.http.get(url);
  
    //    return this.firestore.collection('lektioner').snapshotChanges();
  
    }

  getAll() { 
    return of(this.lyde,this.lydfiler,this.radiokanaler);
      }

  getAudioFiles() {
    return of(this.lydfiler);
  }
  getRadioFiles() {
    return of(this.radiokanaler);
  }
    getPodcastFiles() {
    return of(this.lyde);
  }
}