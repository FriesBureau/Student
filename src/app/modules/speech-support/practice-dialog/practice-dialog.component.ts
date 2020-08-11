import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { YesNo } from '../yes-no-dialog/yes-no.enum';
import { RecognitionResult } from '../../speech-support/speech-support.service';



@Component({
  selector: 'app-yes-no-dialog',
  template: `
    <h1 mat-dialog-title>Svaret er ikke korrekt <mat-icon color="primary" mat-list-icon>thumb_down</mat-icon></h1>
    <mat-dialog-content>
    <p *ngIf="godUdtale">Din udtale er god. Hvad ønsker du at gøre?</p>
    <p *ngIf="!godUdtale">Din udtale er ikke god. Hvad ønsker du at gøre?</p>


      <div style="margin-top:10px;"><strong>{{this.data.transcript}}</strong></div>
      <div style="margin-top:15px;" class="confidence-theme">
        <mat-progress-bar color="{{colorToShow}}" mode="determinate" value="{{confidence}}"></mat-progress-bar>
        <div fxLayout="row nowrap" fxLayoutAlign="space-between center" >
        <span class="mat mat-caption">genkendelighed</span>
        <span class="mat mat-caption">{{confidence|number: '2.1-2'}}%</span>
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button *ngIf="godUdtale" mat-raised-button color="primary" (click)="chooseYes()">Indsæt mit svar alligevel</button>
      <button *ngIf="nytForsoeg" mat-raised-button color="primary" (click)="chooseNo()">Jeg vil prøve igen</button>
      <p style="display:block; width: 100%;">Mente du? {{alternative}}</p> <button *ngIf="nytForsoeg" mat-raised-button color="accent" (click)="chooseAlternative()"> Indsæt alternativ: {{alternative}}</button>
      </mat-dialog-actions>
  `
})
export class PracticeDialogComponent implements OnInit {

  public confidence: number;
  public colorToShow: string;
  public godUdtale: boolean;
  public nytForsoeg: boolean;
  public alternative: string;

  constructor(public dialogRef: MatDialogRef<PracticeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RecognitionResult) { }

  ngOnInit() {
    this.alternative = this.data.alternative;

    this.confidence = this.data.confidence * 100 * 1.0543; //Lagt 5% til da Confidence API regner "for lidt" ift. 100%
//    this.confidence = this.data.confidence * 100;
    if(this.confidence<=75){
      this.colorToShow="warn";
      this.godUdtale=false;
      this.nytForsoeg=true; 
    }

    else if(this.confidence>=75) {
      this.colorToShow="primary";
      this.godUdtale=true;
      this.nytForsoeg=true; 

      console.log(this.confidence + ' confidencetest');

    }else{
      this.colorToShow="accent"
    }
    this.alternative = this.data.alternative;

  }

  public chooseYes(){
    console.log('click on yes.');
    //    this.dialogRef.close({choice:YesNo.yes, response:this.data})
    this.dialogRef.close({choice:YesNo.yes, response:this.data.transcript})
  }
  public chooseAlternative(){
    console.log('click on alternative.');
    this.dialogRef.close({choice:YesNo.alternative, response:this.data.alternative})
  }

  public chooseNo(){
    console.log('click on no.');
    this.dialogRef.close({choice:YesNo.no, response:this.data});
  }
}
