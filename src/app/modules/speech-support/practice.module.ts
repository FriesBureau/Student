import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialConfigModule } from '../../material-config.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PracticeDialogComponent } from './practice-dialog/practice-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialConfigModule,
    FlexLayoutModule
  ],
  exports: [PracticeDialogComponent],
  declarations: [PracticeDialogComponent],
  entryComponents: [PracticeDialogComponent]
})
export class SpeechSupportModule { }
