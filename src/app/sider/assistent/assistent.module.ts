import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssistentComponent } from './assistent/assistent.component';
import { MaterialConfigModule } from '../../material-config.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AssistentSpeechSupportModule } from './assistent-speech-support/assistent-speech-support.module';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';


import { AssistentStartComponent } from './assistent/assistent-start/assistent-start.component';
import { AssistentViewComponent } from './assistent/assistent-view/assistent-view.component';
import { AssistentChatsSidenavComponent } from './assistent/assistent-sidenavs/left/assistentchats/assistentchats.component';
import { AssistentUserSidenavComponent } from './assistent/assistent-sidenavs/left/user/user.component';
import { AssistentLeftSidenavComponent } from './assistent/assistent-sidenavs/left/left.component';
import { AssistentRightSidenavComponent } from './assistent/assistent-sidenavs/right/right.component';
import { AssistentContactSidenavComponent } from './assistent/assistent-sidenavs/right/contact/contact.component';


import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FusePipesModule } from '../../pipes/pipes.module';

import { AssistentRoutingModule } from './assistent-routing.module';

import { AssistentService } from '../../services/assistent.service';
import { ChattestService } from '../../services/chattest.service';
import { AuthService } from '../../services/auth.service';

 

@NgModule({
  declarations: [
    AssistentComponent,
    AssistentStartComponent,
    AssistentViewComponent,
    AssistentChatsSidenavComponent,
    AssistentUserSidenavComponent,
    AssistentLeftSidenavComponent,
    AssistentRightSidenavComponent,
    AssistentContactSidenavComponent,
 

  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialConfigModule,
    MatSelectModule,
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
    AssistentSpeechSupportModule,
    NgxPaginationModule,
    SharedModule,
    AssistentRoutingModule,
    FusePipesModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  providers   : [
    AssistentService,
    ChattestService,
    AuthService
  ],
  exports: [AssistentComponent]
})
export class AssistentModule { }
