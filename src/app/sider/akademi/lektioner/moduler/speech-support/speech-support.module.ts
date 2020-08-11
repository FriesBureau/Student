import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialConfigModule } from '../../../../../material-config.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { YesNoDialogComponent } from './yes-no-dialog/yes-no-dialog.component';
import { PracticeDialogComponent } from './practice-dialog/practice-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialConfigModule,
    FlexLayoutModule
  ],
  exports: [YesNoDialogComponent, PracticeDialogComponent],
  declarations: [YesNoDialogComponent, PracticeDialogComponent],
  entryComponents: [YesNoDialogComponent, PracticeDialogComponent]
})
export class SpeechSupportModule { }
