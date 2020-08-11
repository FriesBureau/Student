import { Component, OnInit } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { CloudService } from '../../services/cloud.service';
import { StreamState } from '../../interfaces/stream-state';
import { AuthService } from '../../services/auth.service';
import { TalkModule } from '../../modules/talk/talk.module';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';

import { DokumenterService } from '../../services/dokumenter.service';


interface Audio {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit { 
  lydfiler: Array<any> = [];
  radiokanaler: Array<any> = [];
  lyde: Array<any> = [];
  state: StreamState;
  currentFile: any = {};
  isShown: boolean = false ; // hidden by default
  isSliderShown: boolean = false ; // hidden by default
 

  audio: Audio[] = [
    {value: 'lesson-1', viewValue: 'Lesson 1'},
    {value: 'lesson-2', viewValue: 'Lesson 2'},
    {value: 'lesson-3', viewValue: 'Lesson 3'}
  ];




  constructor(
    private audioService: AudioService, 
    private cloudService: CloudService, 
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public auth: AuthService,
    private dokumenterservice: DokumenterService,
    private _bottomSheet: MatBottomSheet    ) {
    // get media files
    cloudService.getAudioFiles().subscribe(lydfiler => {
      this.lydfiler = lydfiler;
    });

    dokumenterservice.hentlyd().subscribe(data => {
      this.lydfiler = data;
    });

    cloudService.getRadioFiles().subscribe(radiokanaler => {
      this.radiokanaler = radiokanaler;
    });
    cloudService.getAll().subscribe(lyde => {
      this.lyde = lyde;
    });
 
 

    // listen to stream state
    this.audioService.getState()
    .subscribe(state => {
      this.state = state;
    });
  }

  public ngOnInit(): void {
 
  }

  
  change(event)
  {
    if(event.isUserInput && event.source.value === "lesson-1") {
      console.log(event.source.value, event.source.selected);

      this.isShown =  true;
  }
}

  openBottomRadioSheet(): void {
    this._bottomSheet.open(RadioListe);
  }
  openBottomLessonAudioSheet(): void {
    this._bottomSheet.open(LektionAudioListe);
  }
  openBottomLydSheet(): void {
    this._bottomSheet.open(LydListe);
  }


  formatLabel(volume: number) {

    if (volume >= 10) {
      return Math.round(volume / 10);
    }

    return volume;
  }

  deleteUser () {
    this.afs.doc('users/' + this.afAuth.auth.currentUser.uid).delete().then(function() {
     console.log('user deleted')
   
   console.log('data deleted')
    }).catch(function(error) {
      console.log('der skete en fejl')
    });
    }

  playStream(url) {
    this.audioService.playStream(url)
    .subscribe(events => {
      // listening for fun here
    });
  }

  openFile(file, index) {
    this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(file.url);
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  stop() {
    this.audioService.stop();
  }

 

  next() {
    const index = this.currentFile.index + 1;
    const file = this.lydfiler[index];
    this.openFile(file, index);
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.lydfiler[index];
    this.openFile(file, index);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.lydfiler.length - 1;
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }

  onSliderChangeVolume(change) {
    this.audioService.volumeChange(change.value);
  }

 

    toggleHide() {

      this.isShown =  false;
      
      }

    toggleSliderShow() {

      this.isSliderShown = ! this.isSliderShown;
      
      }
      toggleSliderHide() {

        this.isSliderShown = false;
        
        }
 
    
  
 
}


 
@Component({
  selector: 'radio-liste',
  templateUrl: 'radio-liste.html',
  styleUrls: ['radio-liste.scss']
})
export class RadioListe {

  lydfiler: Array<any> = [];
  radiokanaler: Array<any> = [];
  state: StreamState;
  currentFile: any = {};

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<RadioListe>,
    private audioService: AudioService, 
    cloudService: CloudService) {
          // get media files
 
    cloudService.getRadioFiles().subscribe(radiokanaler => {
      this.radiokanaler = radiokanaler;
    });
    }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  playStream(url) {
    this.audioService.playStream(url)
    .subscribe(events => {
      // listening for fun here
    });
  }

  openFile(file, index) {
    this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(file.url);
  }

    openRadioChannel(radio, index) {
    this.currentFile = { index, radio };
    this.audioService.stop();
    this.playStream(radio.url);
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

}




@Component({
  selector: 'lektion-audio-liste',
  templateUrl: 'lektion-audio-liste.html',
  styleUrls: ['lektion-audio-liste.scss']
})
export class LektionAudioListe {

  lydfiler: Array<any> = [];
  radiokanaler: Array<any> = [];
  state: StreamState;
  currentFile: any = {};

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<LektionAudioListe>,
    private audioService: AudioService, 
    private dokumenterservice: DokumenterService,
    cloudService: CloudService) {
          // get media files
 
/*    cloudService.getAudioFiles().subscribe(lydfiler => {
      this.lydfiler = lydfiler;
    }); */
    dokumenterservice.hentlyd().subscribe(data => {
      this.lydfiler = data;
    });
    }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  playStream(url) {
    this.audioService.playStream(url)
    .subscribe(events => {
      // listening for fun here
    });
  }

  openFile(file, index) {
    this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(file.url);
  }

    openLektionAudio(audio, index) {
    this.currentFile = { index, audio };
    this.audioService.stop();
    this.playStream(audio.vis);
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

}


@Component({
  selector: 'lektion-audio-liste',
  templateUrl: 'lektion-audio-liste.html',
  styleUrls: ['lektion-audio-liste.scss']
})
export class LydListe implements OnInit {

  lydfiler: Array<any> = [];
  radiokanaler: Array<any> = [];
  lyde: Array<any> = [];
  state: StreamState;
  currentFile: any = {};
  lydName: string;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<LydListe>,
    private audioService: AudioService, 
    private cloudService: CloudService) {
          // get media files

 
    cloudService.getAll().subscribe(lyde => {
      this.lyde = lyde;
    });
 
    }

    public ngOnInit(): void {
    }
 

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  playStream(url) {
    this.audioService.playStream(url)
    .subscribe(events => {
      // listening for fun here
    });
  }

  openFile(file, index) {
    this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(file.url);
  }

    openLydliste(lyd, index) {
    this.currentFile = { index, lyd };
    this.audioService.stop();
    this.playStream(lyd.url);
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

}