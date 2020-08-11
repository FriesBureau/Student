import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialConfigModule } from '../../../material-config.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AssistentYesNoDialogComponent } from './assistent-yes-no-dialog/assistent-yes-no-dialog.component';
import { AssistentPracticeDialogComponent } from './assistent-practice-dialog/assistent-practice-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialConfigModule,
    FlexLayoutModule
  ],
  exports: [AssistentYesNoDialogComponent, AssistentPracticeDialogComponent],
  declarations: [AssistentYesNoDialogComponent, AssistentPracticeDialogComponent],
  entryComponents: [AssistentYesNoDialogComponent, AssistentPracticeDialogComponent]
})
export class AssistentSpeechSupportModule { }
