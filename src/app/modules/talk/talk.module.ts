import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TalkFormComponent } from './talk-form/talk-form.component';
import { MaterialConfigModule } from '../../material-config.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpeechSupportModule } from '../speech-support/speech-support.module';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialConfigModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    SpeechSupportModule
  ],
  exports: [TalkFormComponent],
  declarations: [TalkFormComponent],
})
export class TalkModule { }
