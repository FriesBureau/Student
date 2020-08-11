import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SpeechSupportService, RecognitionResult } from '../moduler/speech-support/speech-support.service';
import { QuizService } from '../../../../services/quiz.service';
import { HelperService } from '../../../../services/helper.service';
import { Option, Question, Quiz, QuizConfig } from '../../../../model/index';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { NgForm } from '@angular/forms';
import { LektionService } from '../../../../services/lektion.service';

import { Lektion, Svar } from '../../../../model/lektion.model';


@Component({
  selector: 'app-lektioner',
  templateUrl: './lektion.component.html',
  styleUrls: ['./lektion.component.scss'],
  providers: [QuizService]
})
export class LektionComponent implements OnInit {

  scores = [0 , 0];

  

  private targetElementName: string;

  public readonly reasonFieldName = 'reason';
  public readonly amountFieldName = 'amount';
  public readonly selectedLanguageFieldName = 'selectedLanguage';
  private _formBuilder: FormBuilder
  public talkForm: FormGroup

  public get Reason(): AbstractControl {
    return this.talkForm.get(this.reasonFieldName);
  }

  public get Amount(): AbstractControl {
    return this.talkForm.get(this.amountFieldName);
  }

  public get SelectedLanguage(): AbstractControl{
    return this.talkForm.get(this.selectedLanguageFieldName);
  }

  public get ListeningReason(): boolean {
    return this.speech.IsListening && this.targetElementName === this.reasonFieldName;
  }

  public get ListeningAmount(): boolean {
    return this.speech.IsListening && this.targetElementName === this.amountFieldName;
  }

  quizes: any[]; 
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName: string;
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 120,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': true,
    'showPager': true,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';


  constructor(private fb: FormBuilder, 
    public speech: SpeechSupportService, 
    private quizService: QuizService,
    private lektionService: LektionService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
    ) { }


  public ngOnInit(): void {


    this.quizes = this.quizService.getAll();
    this.quizName = this.quizes[0].id;
    this.loadQuiz(this.quizName);
 

    this.talkForm = this.fb.group({
      reason: [null, [Validators.required, Validators.maxLength(2000)]],
     //  amount: [null, [Validators.required, Validators.maxLength(2000)]],
     // amount: [null, [Validators.required, Validators.min(0)]],


      selectedLanguage: ['da-DK']
    });

    this.talkForm.get('reason').disable();

    

    this.speech.Result.subscribe((result: RecognitionResult) => {
      console.log('Result event on the controller.');
      window.document.getElementById(this.targetElementName).focus();
      if (!result) {
      this.targetElementName = null;
  
      return;
      }
      if (this.targetElementName === this.reasonFieldName) {

 

        this.Reason.setValue(result);
      
     
        console.log('transcript resultat' + result.transcript)
      } 
      this.targetElementName = null;
  
    });
  }

  public toggleListening(fieldSelected: string): void {
    this.targetElementName = fieldSelected;

    if (this.speech.IsListening) {
      this.speech.stopListening();
    } else {
      this.speech.requestListening(this.SelectedLanguage.value);
    }
  }

  public clearCard(): void {
    const languageValueBefore = this.SelectedLanguage.value;
    this.talkForm.reset();
    this.SelectedLanguage.setValue(languageValueBefore); 
  }

  public saveExpense(): void {
    const rawData = this.talkForm.getRawValue();

    // send the data to you backend service and handle the answer.
    console.log(rawData);
  }


  loadQuiz(quizName: string) {
    this.quizService.get(quizName).subscribe(res => {
      console.log(res);
      this.quiz = new Quiz(res);
      this.pager.count = this.quiz.questions.length;
      this.startTime = new Date();
      this.ellapsedTime = '00:00';
      this.timer = setInterval(() => { this.tick(); }, 1000);
      this.duration = this.parseTime(this.config.duration);
    });
    this.mode = 'quiz';
  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.config.duration) {
    //  this.onSubmit();
    }
    this.ellapsedTime = this.parseTime(diff);
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
    }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }
 
/*
  onSubmit() {
    let answers = [];
    this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.answered }));

    // Post your data to the server here. answers contains the questionId and the users' answer.
    // console.log(this.quiz.questions);
    // this.mode = 'result';
  }
 */
  


  tjekSvar(question: Question, option: Option) {
    const rawData = this.talkForm.getRawValue();
    const getInput = <HTMLInputElement>document.querySelector('#spoergsmaal');
    const tjek = getInput.value; 
    console.log(rawData);
    

    if (rawData.reason === tjek) {
      console.log('Godkendt svar og tildeling af point');
// Tillader aktivering af input tekstfelt
      this.talkForm.get('reason').enable();
  
  // Skifter side
      this.goTo(this.pager.index + 1);
      this.clearCard();
     
      // Mangler nulstilling af input felt.
      console.log(getInput.value);
      this.scores[0] = this.scores[0]+1;
    }
    else {
      console.log('svaret er ikke korrekt');
    }
  }

  
  lyd() {   
  //  const getInput = <HTMLInputElement>document.querySelector('#spoergsmaal');
  const getInput = <HTMLInputElement>document.querySelector('#udtale');
    const tjek = getInput.value; 
    

  var msg = new SpeechSynthesisUtterance(tjek);
  msg.rate = 0.7;
  (<any>window).speechSynthesis.speak(msg)
}


}
 


export interface tjekSvar {
  tjek: string;

}
