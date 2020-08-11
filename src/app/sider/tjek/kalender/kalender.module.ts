import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CalendarModule } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { KalenderComponent } from './kalender.component';
import { EventFormComponent } from './event-form/event-form.component';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AuthService } from '../../../services/auth.service';
import { KalenderService } from '../../../services/kalender.service';
import { Event } from '../../../model/event.model';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ColorPickerModule } from 'ngx-color-picker';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { ConfirmDialogModule } from './confirm-dialog/confirm-dialog.module';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';


const routes: Routes = [
  {
      path     : '**',
      component:     KalenderComponent,
      children : [],
      resolve  : {
          chat: KalenderService
      }
  }
];

@NgModule({
  declarations: [
    KalenderComponent,
    EventFormComponent,
  ],
  imports: [
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    RouterModule.forChild(routes),
    ColorPickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTooltipModule,
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    AngularCalendarModule.forRoot({
      provide   : DateAdapter,
      useFactory: adapterFactory
  }),
    ConfirmDialogModule

  ],
  exports: [
    KalenderComponent,

  ],
  providers: [KalenderService,AuthService
  ],
  entryComponents: [
    EventFormComponent
  ],
})
export class KalenderModule { }
