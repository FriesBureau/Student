import { Component, OnInit } from '@angular/core';
import { AssistentSpeechSupportService, RecognitionResult } from '../assistent-speech-support/assistent-speech-support.service';
import { FormsModule, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Renderer2, ViewChild, ElementRef } from '@angular/core';
import { AssistentService } from '../../../services/assistent.service';
import { ChattestService } from '../../../services/chattest.service';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { NgForm } from '@angular/forms';

import { OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '../../../animations/animations';



@Component({
  selector: 'app-assistent',
  templateUrl: './assistent.component.html',
  styleUrls: ['./assistent.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})


export class AssistentComponent implements OnInit {
  
  @ViewChild('div', {static: false}) div: ElementRef;

 
 

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
  userChats$;
  Subjects$;
  getuserChats$;
  getMessages$;
  chatId;
  alleredeEmnevalg: boolean = false ; // hidden by default

  

  constructor(
    private fb: FormBuilder, 
    private renderer: Renderer2,
    public speech: AssistentSpeechSupportService,
    private assist: AssistentService,
    private _chatService: ChattestService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,


    ) {     }

   public ngOnInit(): void { 
    this.userChats$ = this.assist.getUserChats();
    this.Subjects$ = this.assist.getSubjects();

 

    if (this.route.snapshot.data.resolve) { 
     

      this.route.params.subscribe(routeParams => {
        const chatId =  this.route.snapshot.data.resolve;
        console.log('lav indhentning af data'); 
        const source = this.assist.get(chatId);
        this.chat$ = this.assist.joinUsers(source); 

    
      });
    } 
      else  { console.log('ingenting')  } 

       /*  if (this.route.snapshot.data.resolve) { 
          const chatId =  this.route.snapshot.data.resolve;
        console.log('lav indhentning af data'); 
        const source = this.assist.get(chatId);
        this.chat$ = this.assist.joinUsers(source); 
      } else  { console.log('ingenting')  } 
      */
      // .pipe(tap(v => this.scrollBottom(v)));
     

this.getMessages$ = this.assist.getMessages();

      this.talkForm = this.fb.group({
        reason: [null, [Validators.required, Validators.maxLength(2000)]],
        selectedLanguage: ['da-DK']
      });
  
      this.talkForm.get('reason').disable();

      this.speech.Result.subscribe((result: RecognitionResult) => {
        console.log('transcript resultat ' + result);
      
        const brugerbibliotek = "Det er noget nyt";

        const sprogassistentbibliotek = "Det er godt at høre";
        const assistentsvar = new SpeechSynthesisUtterance(sprogassistentbibliotek);
        if (String(result).includes(brugerbibliotek)) {  
          console.log('Opret talesvar fra assistent');
          (<any>window).speechSynthesis.speak(assistentsvar);
      //    this.sprogassistentSvar();

const chatId =  this.route.snapshot.data.resolve;
      this.assist.sendAssistantResult(chatId, sprogassistentbibliotek);

        }
    });
    }

    tjekAntalSnakke()  {
if ( this.userChats$.length > 5)  {
  alert(this.userChats$.length);
} else {
  console.log(this.userChats$.length)
};
}
 

   sprogassistentSvar() {
    const p: HTMLParagraphElement = this.renderer.createElement('p');
    
     
    this.renderer.appendChild(this.div.nativeElement, p);
    const sprogassistentbibliotek = "Det er godt at høre";
      p.innerHTML = String(sprogassistentbibliotek);  
      console.log('sprogassistentsvar');

    }

  public toggleListening(fieldSelected: string): void {
    this.targetElementName = fieldSelected;

    if (this.speech.IsListening) {
      this.speech.stopListening();
    } else {
      this.speech.requestListening(this.SelectedLanguage.value);
    }
  }

 

  // Oprette bruger tekst 
  
  addHumanText(result) {
    const voice = document.querySelector(".voice");
const voice2text = document.querySelector(".voice2text");
    const chatContainer = document.createElement("div");
    chatContainer.classList.add("chat-container");
    const chatBox = document.createElement("p");
    chatBox.classList.add("voice2text");
    const chatText = document.createTextNode(result);
    chatBox.appendChild(chatText);
    chatContainer.appendChild(chatBox);
    return chatContainer;
  }

  // Oprette assistent tekst

  addBotText(result) {
    const voice = document.querySelector(".voice");
const voice2text = document.querySelector(".voice2text");
    const chatContainer1 = document.createElement("div");
    chatContainer1.classList.add("chat-container");
    chatContainer1.classList.add("darker");
    const chatBox1 = document.createElement("p");
    chatBox1.classList.add("voice2text");
    const chatText1 = document.createTextNode(result);
    chatBox1.appendChild(chatText1);
    chatContainer1.appendChild(chatBox1);
    return chatContainer1;
  }

  // Sprog Assistent

  assistentlyd() {   
    //  const getInput = <HTMLInputElement>document.querySelector('#spoergsmaal');
    const getInput = <HTMLInputElement>document.querySelector('#assistentlyd');
      const tjek = getInput.value; 
      
  
    var msg = new SpeechSynthesisUtterance(tjek);
    msg.rate = 0.7;
    (<any>window).speechSynthesis.speak(msg);
    
  }

  assistentbeskedlyd(brugerLinje) {   
    //  const getInput = <HTMLInputElement>document.querySelector('#spoergsmaal');
    const getInput = <HTMLInputElement>document.querySelector('#brugerLinje');
      const tjek = getInput.value; 
      
  
    var msg = new SpeechSynthesisUtterance(brugerLinje);
    msg.rate = 0.7;
    (<any>window).speechSynthesis.speak(msg);
    
  }

  

  beskeder;

 
      

deleteOrder = data => this.assist.deleteCoffeeOrder(data);

markCompleted = subjectdata => this.assist.updateSubject(subjectdata);

  coffees = [
    'Hej',
    'Hvordan går det?',
    'Jeg hedder',
    'Mit navn er',
    'Hvad med dig?',
    'Vi ses',
    'Farvel',
    'Hvad laver du?',
    'Det er godt'
  ];

  besked = [];

  addCoffee = brugerbesked => this.besked.push(brugerbesked)
 

  removeCoffee = brugerbesked => {
    let index = this.besked.indexOf(brugerbesked);
    if (index > -1) this.besked.splice(index, 1);
  };

 
 
    
      onSendMessage() {
        this.assist.brugerForm.value.besked = this.besked; // denne linje er til valgmulighederne
        let data = this.assist.brugerForm.value; // denne linje er til input
        let result = this.besked;
        alert(this.chatId);
        this.assist.sendMessage(this.chatId, data).then(res => {
          /*do something here....maybe clear the form or give a success message*/
         //  this.clearCard();
         // this.updateScroll();
          
          
        });
    
      }
    
      public clearCard(): void {
        this.assist.brugerForm.reset(); 
      }
       updateScroll(){
     
        var element = document.getElementById("brugerBeskeder");
        element.scrollTop = element.scrollHeight;
    
    //    scrollUp.scrollTop = scrollUp.scrollHeight;
    }

checkResolve(){
 const tjekchatId =  this.route.snapshot.data.resolve;
 alert(tjekchatId);
}

  
submit(chatId) {
  this.assist.brugerForm.value.besked = this.besked; // denne linje er til valgmulighederne
  let brugerForm = this.assist.brugerForm.value; 
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
