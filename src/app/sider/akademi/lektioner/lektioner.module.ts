import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LektionComponent } from './lektion/lektion.component';
 
import { MaterialConfigModule } from '../../../material-config.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpeechSupportModule } from './moduler/speech-support/speech-support.module';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { NgxPaginationModule } from 'ngx-pagination';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionComponent } from './questions/question/question.component';

import { MatDialogModule } from '@angular/material/dialog';
import { BoardDialogComponent } from './questions/dialogs/board-dialog.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { QuestionDialogComponent } from './questions/dialogs/question-dialog.component';
import { DeleteButtonComponent } from './questions/delete-button/delete-button.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialConfigModule,
    MatSelectModule,
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
    SpeechSupportModule,
    NgxPaginationModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatSlideToggleModule
  ],
  exports: [LektionComponent],
  declarations: [LektionComponent, 
    QuestionsComponent, 
    QuestionComponent, 
    BoardDialogComponent, 
    QuestionDialogComponent,
    DeleteButtonComponent],
})
export class LektionerModule { }
