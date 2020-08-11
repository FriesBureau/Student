// src/app/material.module.ts
import { NgModule } from '@angular/core';
import {  MatButtonModule} from '@angular/material/button';
import {  MatListModule} from '@angular/material/list';
import {  MatSliderModule} from '@angular/material/slider';
import {  MatIconModule} from '@angular/material/icon';
import {  MatToolbarModule} from '@angular/material/toolbar';
import {  MatCardModule} from '@angular/material/card';
import {  MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {  MatDialogModule } from '@angular/material/dialog';
import {  MatSnackBarModule   } from '@angular/material/snack-bar';
import {  MatProgressBarModule   } from '@angular/material/progress-bar';


const modules = [
  MatButtonModule,
  MatListModule,
  MatSliderModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatCardModule, MatInputModule, MatRadioModule, 
  MatDialogModule, MatSnackBarModule, MatProgressBarModule 
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}
