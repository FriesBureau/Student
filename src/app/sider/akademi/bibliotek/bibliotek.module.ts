import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';

import { SharedModule } from '../../../shared/shared.module';

import { DokumenterService } from '../../../services/dokumenter.service';
import { DokumenterComponent } from './dokumenter/dokumenter.component';
import { DokumentlisteComponent } from './dokumentliste/dokumentliste.component';
import { VenstremenuComponent } from './sidemenuer/venstremenu/venstremenu.component';
import { SagerComponent } from './sidemenuer/sager/sager.component';
import { UploadComponent } from './upload/upload.component';
import { UploadTaskComponent } from './upload-task/upload-task.component';
import { DropzoneDirective } from './upload/dropzone.directive';

import {DatePipe, DecimalPipe} from '@angular/common';

// Locales
import { LOCALE_ID, Inject, NgZone } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDa from '@angular/common/locales/da';
import localeDaExtra from '@angular/common/locales/extra/da';

import { NgxDocViewerModule } from 'ngx-doc-viewer';



const routes: Routes = [ 
    {
        path     : '**',
        component: DokumenterComponent,
        children : [],
        resolve  : {
            files: DokumenterService
        }
    }
];

@NgModule({
    declarations: [
      DokumenterComponent,
      DokumentlisteComponent,
        VenstremenuComponent,
        SagerComponent,
        UploadComponent,
        UploadTaskComponent,
        DropzoneDirective
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatIconModule,
        MatRippleModule,
        MatSlideToggleModule,
        MatTableModule,
        NgxDocViewerModule,
        SharedModule
    ],
    providers   : [
      DokumenterService, DatePipe, DecimalPipe
    ]
})
export class BibliotekModule
{
    constructor() {
        registerLocaleData(localeDa, 'da', localeDaExtra);
       }
}
