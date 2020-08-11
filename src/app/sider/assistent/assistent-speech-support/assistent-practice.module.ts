import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialConfigModule } from '../../../material-config.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AssistentPracticeDialogComponent } from './assistent-practice-dialog/assistent-practice-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialConfigModule,
    FlexLayoutModule
  ],
  exports: [AssistentPracticeDialogComponent],
  declarations: [AssistentPracticeDialogComponent],
  entryComponents: [AssistentPracticeDialogComponent]
})
export class AssistentPracticeModule { }
