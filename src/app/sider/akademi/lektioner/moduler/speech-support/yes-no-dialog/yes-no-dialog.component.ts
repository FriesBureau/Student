import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { YesNo } from './yes-no.enum';
import { RecognitionResult } from '../speech-support.service';



@Component({
  selector: 'app-yes-no-dialog',
  template: `
    <h1 mat-dialog-title>Dit svar er korrekt !!</h1>
    <mat-dialog-content>
      <p *ngIf="nytForsoeg">Resultatet er ikke godkendt. Prøv igen :-)</p>
      <p *ngIf="korrektSvar">Er du tilfreds med resultatet?</p>

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
      <button *ngIf="korrektSvar" mat-button (click)="chooseNo()">Nej, jeg vil prøve igen</button>
      <button *ngIf="korrektSvar" mat-raised-button color="primary" (click)="chooseYes()">Ja, indsæt mit svar</button>
      <button *ngIf="nytForsoeg" mat-raised-button color="primary" (click)="chooseNo()">Ja, jeg vil prøve igen</button>
    </mat-dialog-actions>
  `
})
export class YesNoDialogComponent implements OnInit {

  public confidence: number;
  public colorToShow: string;
  public korrektSvar: boolean;
  public nytForsoeg: boolean;

  constructor(public dialogRef: MatDialogRef<YesNoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RecognitionResult) { }

  ngOnInit() {
    this.confidence = this.data.confidence * 100 * 1.0543; //Lagt 5% til da Confidence API regner "for lidt" ift. 100%
//    this.confidence = this.data.confidence * 100;
    if(this.confidence<=60){
      this.colorToShow="warn";
      this.korrektSvar=false;
      this.nytForsoeg=true;
      
    }else if(this.confidence>=60) {
      this.colorToShow="primary";
      this.korrektSvar=true;

    }else{
      this.colorToShow="accent"
    }
  }

  public chooseYes(){
    console.log('click on yes.');
    //    this.dialogRef.close({choice:YesNo.yes, response:this.data})
    this.dialogRef.close({choice:YesNo.yes, response:this.data.transcript})
  }

  public chooseNo(){
    console.log('click on no.');
    this.dialogRef.close({choice:YesNo.no, response:this.data});
  }
}
