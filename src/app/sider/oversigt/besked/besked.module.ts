import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../../../shared/shared.module';
import { AuthGuard } from '../../../sider/oversigt/bruger/guard/auth.guard';

import * as fromGuards from './store/guards/index';


import { BeskedStoreModule } from './store/store.module';
import { BeskedComponent } from '../besked/besked.component';
import { BeskedListeComponent } from '../besked/besked-liste/besked-liste.component';
import { BeskedListeEnhedComponent } from '../besked/besked-liste/besked-liste-enhed/besked-liste-enhed.component';
import { BeskedDetaljerComponent } from '../besked/besked-detaljer/besked-detaljer.component';
import { BeskedSidebarComponent } from '../besked/besked-sidebar/besked-sidebar.component';
import { ComposeComponent } from '../besked/dialogs/compose/compose.component';
import { BeskedService } from '../../../services/besked.service';

import { FusePipesModule } from '../../../pipes/pipes.module';



const routes: Routes = [
    {
        path       : 'label/:labelHandle',
        component  : BeskedComponent,
        canActivate: [fromGuards.ResolveGuard]
    },
    {
        path       : 'label/:labelHandle/:beskedId',
        component  : BeskedComponent,
        canActivate: [fromGuards.ResolveGuard]
    },
    {
        path       : 'filter/:filterHandle',
        component  : BeskedComponent,
        canActivate: [fromGuards.ResolveGuard]
    },
    {
        path       : 'filter/:filterHandle/:beskedId',
        component  : BeskedComponent,
        canActivate: [fromGuards.ResolveGuard]
    },
    {
        path       : ':folderHandle',
        component  : BeskedComponent,
        canActivate: [fromGuards.ResolveGuard]
    },
    {
        path       : ':folderHandle/:beskedId',
        component  : BeskedComponent,
        canActivate: [fromGuards.ResolveGuard]
    },
    {
        path      : '**',
        redirectTo: 'inbox'
    }
];

@NgModule({
    declarations   : [
        BeskedComponent,
        BeskedListeComponent,
        BeskedListeEnhedComponent,
        BeskedDetaljerComponent,
        BeskedSidebarComponent,
        ComposeComponent
    ],
    imports        : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        TranslateModule,
        FusePipesModule,
        SharedModule,

        BeskedStoreModule
    ],
    providers      : [
        BeskedService,
        fromGuards.ResolveGuard
     
    ],
    entryComponents: [ComposeComponent]
})
export class BeskedModule
{
}
