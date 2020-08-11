import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { ColorPickerModule } from 'ngx-color-picker';
import { FusePipesModule } from '../../../pipes/pipes.module';

import { SharedModule } from '../../../shared/shared.module';

import { OpgaveComponent } from '../opgave/opgave.component';
import { OpgaveListeComponent } from '../opgave/opgave-liste/opgave-liste.component';
import { OpgaveDetaljerComponent } from '../opgave/opgave-detaljer/opgave-detaljer.component';
import { OpgaveListeItemComponent } from '..//opgave/opgave-liste/opgave-liste-item/opgave-liste-item.component';
import { OpgaveSidebarComponent } from '../opgave/opgave-sidebar/opgave-sidebar.component';

import { OpgaveService } from '../../../services/opgave.service';
import {DatePipe} from '@angular/common';

const routes: Routes = [
  
{ 
  path     : 'all', 
  component: OpgaveComponent,
  resolve  : {
      opgave: OpgaveService
  }
},
{
  path     : 'all/:opgaveId',
  component: OpgaveComponent,
  resolve  : {
    opgave: OpgaveService
  }
},
{
  path     : 'tag/:tagHandle',
  component: OpgaveComponent,
  resolve  : {
      opgave: OpgaveService
  }
},
{
  path     : 'tag/:tagHandle/:opgaveId',
  component: OpgaveComponent,
  resolve  : {
      opgave: OpgaveService
  }
},
{
  path     : 'filter/:filterHandle',
  component: OpgaveComponent,
  resolve  : {
      opgave: OpgaveService
  }
},
{
  path     : 'filter/:filterHandle/:opgaveId',
  component: OpgaveComponent,
  resolve  : {
      opgave: OpgaveService
  }
},
  {
      path      : '**',
      redirectTo: 'all'
  }
];



@NgModule({
  declarations: [
    OpgaveComponent,
    OpgaveListeComponent,
    OpgaveDetaljerComponent,
    OpgaveListeItemComponent,
    OpgaveSidebarComponent
  ],
  imports     : [
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    MatNativeDateModule,
    SharedModule,
      RouterModule.forChild(routes),
      FusePipesModule,
      MatButtonModule,
      MatCheckboxModule,
      MatDatepickerModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatMenuModule,
      MatRippleModule,
      MatSelectModule,
      ColorPickerModule,
      NgxDnDModule,
  ],
  providers   : [
      OpgaveService,
      DatePipe
  ]
})
export class OpgaveModule { }
