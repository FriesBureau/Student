import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FusePerfectScrollbarDirective } from '../../../../directives/fuse-perfect-scrollbar.directive';
import { AssistentService } from '../../../../services/assistent.service';
import { fuseAnimations } from '../../../../animations/animations';


import { AssistentSpeechSupportService, RecognitionResult } from '../../assistent-speech-support/assistent-speech-support.service';
import { FormsModule, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Renderer2, ElementRef } from '@angular/core';
import { ChattestService } from '../../../../services/chattest.service';
import { AuthService } from '../../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

 

@Component({
    selector     : 'assistent-view',
    templateUrl  : './assistent-view.component.html',
    styleUrls    : ['./assistent-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AssistentViewComponent implements OnInit 
{
    user: any;
    chat: any;
    dialog: any;
    contact: any;
    replyInput: any;
    selectedChat: any;
    

    @ViewChild(FusePerfectScrollbarDirective,{static: false} )
    directiveScroll: FusePerfectScrollbarDirective;

    @ViewChildren('replyInput')
    replyInputField;

    @ViewChild('replyForm',{static: false})
    replyForm: NgForm;

    @ViewChild('div', {static: false}) div: ElementRef;


    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ChatService} _chatService
     */

/* Assistent */


private targetElementName: string;
public readonly brugerLinje = 'brugerLinje';
public readonly brugerFieldName = 'brugerkontrol';
public readonly reasonFieldName = 'reason';
public readonly selectedLanguageFieldName = 'selectedLanguage';
private _formBuilder: FormBuilder
public talkForm: FormGroup
public brugerForm: FormGroup

public get Bruger(): AbstractControl {
  return this.brugerForm.get(this.brugerFieldName);
}

public get Reason(): AbstractControl {
  return this.talkForm.get(this.reasonFieldName);
}
public get SelectedLanguage(): AbstractControl{
  return this.talkForm.get(this.selectedLanguageFieldName);
}

// Denne aktiverer lytning via funktionen (click)="toggleListening(reasonFieldName)"  
public get ListeningReason(): boolean {
  return this.speech.IsListening && this.targetElementName === this.reasonFieldName;
}

 chat$: Observable<any>;
newMsg: string;
getuserChats$;
getMessages$;

    constructor(
        private _chatService: ChattestService,
        private fb: FormBuilder, 
        private renderer: Renderer2,
        public speech: AssistentSpeechSupportService,
        private assist: AssistentService,
        private route: ActivatedRoute,
        private auth: AuthService,
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit() {
      const chatId = this.route.snapshot.paramMap.get('id');
      const source = this.assist.get(chatId);
      this.chat$ = this.assist.joinUsers(source); // .pipe(tap(v => this.scrollBottom(v)));
      this.scrollBottom();
    }
    
  
    submit(chatId) {
      if (!this.newMsg) {
        return alert('you need to enter something');
      }
      this.assist.sendMessage(chatId, this.newMsg);
      this.newMsg = '';
      this.scrollBottom();
    }
  
    trackByCreated(i, msg) {
      return msg.createdAt;
    }
  
    private scrollBottom() {
      setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);
    }
  }