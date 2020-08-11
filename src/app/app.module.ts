import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Title }  from '@angular/platform-browser';

import { MaterialModule } from '../app/material/material.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, Inject, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Locales
import { registerLocaleData } from '@angular/common';
import localeDa from '@angular/common/locales/da';
import localeDaExtra from '@angular/common/locales/extra/da';

import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { NgxPaginationModule } from 'ngx-pagination';

// Translations
import { TranslateModule } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Shared module
import { SharedModule } from '../app/shared/shared.module';


// Assistent 
import { AssistentModule } from './sider/assistent/assistent.module';
// import { AssistentChatComponent } from './sider/assistent/chat/chat.component';

import { ChatComponent } from './chat/chat.component';

// Lektioner module
import { LektionerModule } from './sider/akademi/lektioner/lektioner.module';

// Tjek 
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeDbService } from '../app/fake-db/fake-db.service';
import { FusePipesModule } from '../app/pipes/pipes.module';
import { ScheduleService } from '../app/services/schedule.service';
import { ColorPickerModule } from 'ngx-color-picker';

// Akademi
import { KursusComponent } from './sider/akademi/kursus/kursus.component';
import { KurserComponent } from './sider/akademi/kurser/kurser.component';

// Bibliotek
import { BibliotekModule } from './sider/akademi/bibliotek/bibliotek.module';


// Oversigt
import { OversigtComponent } from './sider/oversigt/oversigt.component';
import { WidgetsComponent } from './sider/oversigt/widgets/widgets.component';
import { FuseWidgetToggleDirective } from './sider/oversigt/widgets/widget-toggle.directive';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts';
import { UdviklingComponent } from './sider/oversigt/udvikling/udvikling.component';
import { BrugerComponent } from './sider/oversigt/bruger/bruger.component';
import { BrugerPointComponent } from './sider/oversigt/point/point.component';
import { PlayerComponent } from './sider/player/player.component';
import { RadioListe } from './sider/player/player.component';
import { LektionAudioListe } from './sider/player/player.component';
import { LydListe } from './sider/player/player.component';

// Spil
import { HuskespilModule } from './sider/oversigt/spil/huskespil/huskespil.module';
import { GameOfTheMonthComponent } from './sider/oversigt/game-of-the-month/game-of-the-month.component';


// Talk module
import { TalkModule } from './modules/talk/talk.module';
import { environment } from '../environments/environment';


// Form modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material modules
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';

// Components
import { AppComponent } from './app/app.component';

// State
import { AppStoreModule } from '../app/store/store.module';

/// Angular Fire
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';


// Projekt
import { ProjektOversigtComponent } from './sider/projekt/projektoversigt/projektoversigt.component';
import { AddListComponent } from './sider/projekt/board/add-list/add-list.component';
import { EditBoardNameComponent } from './sider/projekt/board/edit-board-name/edit-board-name.component';
import { BoardListComponent } from './sider/projekt/board/list/list.component';
import { BoardCardComponent } from './sider/projekt/board/list/card/card.component';
import { SidenavsComponent } from './sider/projekt/board/sidenavs/sidenavs.component';
import { CardDialogComponent } from './sider/projekt/board/dialogs/card/card.component';
import { BoardLabelSelectorComponent } from './sider/projekt/board/dialogs/card/label-selector/label-selector.component';
import { BoardAddCardComponent } from './sider/projekt/board/list/add-card/add-card.component';
import { BoardEditListNameComponent } from './sider/projekt/board/list/edit-list-name/edit-list-name.component';
import { BoardSettingsSidenavComponent } from './sider/projekt/board/sidenavs/settings/settings.component';
import { BoardColorSelectorComponent } from './sider/projekt/board/sidenavs/settings/board-color-selector/board-color-selector.component';
import { BoardComponent } from './sider/projekt/board/board.component';
import { ProjektService, BoardResolve } from './services/projekt.service';
import { boardIdResolver } from './sider/projekt/board/boardidresolver';
import { OpretBrugerComponent } from './sider/oversigt/bruger/opret-bruger/opret-bruger.component';
import { EmailGodkendelseComponent } from './sider/oversigt/bruger/email-godkendelse/email-godkendelse.component';
import { GlemtAdgangskodeComponent } from './sider/oversigt/bruger/glemt-adgangskode/glemt-adgangskode.component';
import { ReaderComponent } from './sider/akademi/bibliotek/reader/reader.component';

// Besked
/*
import { BeskedComponent } from './sider/oversigt/besked/besked.component';
import { SidebarsComponent } from './sider/oversigt/besked/sidebars/sidebars.component';
import { ComposeComponent } from './sider/oversigt/besked/dialogs/compose/compose.component';
import { BeskedListeComponent } from './sider/oversigt/besked/besked-liste/besked-liste.component';
import { BeskedListeEnhedComponent } from './sider/oversigt/besked/besked-liste/besked-liste-enhed/besked-liste-enhed.component';
import { BeskedDetaljerComponent } from './sider/oversigt/besked/besked-detaljer/besked-detaljer.component';
*/





@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    GameOfTheMonthComponent,
    BrugerComponent,
    BrugerPointComponent,
    ChatComponent,
    OversigtComponent,
    KursusComponent,
    KurserComponent,
    UdviklingComponent,
    WidgetsComponent,
    FuseWidgetToggleDirective,
    ProjektOversigtComponent,
    BoardComponent,
    AddListComponent,
    EditBoardNameComponent,
    BoardListComponent,
    BoardCardComponent,
    SidenavsComponent,
    CardDialogComponent,
    BoardLabelSelectorComponent,
    BoardAddCardComponent,
    BoardEditListNameComponent,
    BoardSettingsSidenavComponent,
    BoardColorSelectorComponent,
    RadioListe,
    LektionAudioListe,
    LydListe,
    OpretBrugerComponent,
    EmailGodkendelseComponent,
    GlemtAdgangskodeComponent,
    ReaderComponent
      ],
      
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    SharedModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    InMemoryWebApiModule.forRoot(FakeDbService, {
      delay             : 0,
      passThruUnknownUrl: true
  }),
    BibliotekModule,
    TalkModule,
    HuskespilModule,
    AssistentModule,
    LektionerModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSelectModule,
    FusePipesModule,
  ColorPickerModule,
  NgxChartsModule,
  ChartsModule,
  AgmCoreModule.forRoot({
    apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
}),
NgxDnDModule,
AppStoreModule,
TranslateModule.forRoot({
  loader: {
    provide: TranslateLoader,
    useFactory: httpTranslateLoader,
    deps: [HttpClient]
  }
})

//    HttpClientModule
  ],
  providers: [Title, ProjektService, BoardResolve, boardIdResolver, ScheduleService,
   // { provide: LOCALE_ID, useValue: 'da' },
  ],
   bootstrap: [AppComponent],
    entryComponents: [
      RadioListe,LektionAudioListe,LydListe,CardDialogComponent
    ]
})
export class AppModule {
  constructor() {
   registerLocaleData(localeDa, 'da', localeDaExtra);
  }
 }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}