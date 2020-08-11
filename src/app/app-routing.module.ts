// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerComponent } from './sider/player/player.component';

import { TalkFormComponent } from './modules/talk/talk-form/talk-form.component';

import { LektionComponent } from './sider/akademi/lektioner/lektion/lektion.component';


import { BrugerComponent } from './sider/oversigt/bruger/bruger.component';

 import { AssistentComponent } from './sider/assistent/assistent/assistent.component';

import { AuthGuard } from './sider/oversigt/bruger/guard/auth.guard';

import { ChatComponent } from './chat/chat.component';


import { KalenderComponent } from './sider/tjek/kalender/kalender.component';
import { KalenderService } from './services/kalender.service';

// Akademi
import { KurserComponent } from './sider/akademi/kurser/kurser.component';
import { KursusComponent } from './sider/akademi/kursus/kursus.component';

// Oversigt
import { OversigtComponent } from './sider/oversigt/oversigt.component';
import { UdviklingComponent } from './sider/oversigt/udvikling/udvikling.component';


// Administrator

import { ProjektOversigtComponent } from './sider/projekt/projektoversigt/projektoversigt.component';
import { BoardComponent } from './sider/projekt/board/board.component';

// Services

import { KurserService } from './services/kurser.service';
import { KursusService } from './services/kursus.service';
import { DokumenterService } from './services/dokumenter.service';
import { OversigtService } from './services/oversigt.service';
import { UdviklingService } from './services/udvikling.service';
import { AssistentService } from './services/assistent.service';
import { ChattestService } from './services/chattest.service';
import { BoardResolve, ProjektService } from './services/projekt.service';
import { boardIdResolver } from './sider/projekt/board/boardidresolver';




const routes: Routes = [
  {
    path        : 'bibliotek',
    canActivate: [AuthGuard],
    loadChildren: () => import('./sider/akademi/bibliotek/bibliotek.module').then(m => m.BibliotekModule)
},
  {
    path        : 'opgave',
    canActivate: [AuthGuard],
    loadChildren: () => import('./sider/tjek/opgave/opgave.module').then(m => m.OpgaveModule)
},

  {
    path        : 'huskespil',
    loadChildren: () => import('./sider/oversigt/spil/huskespil/huskespil.module').then(m => m.HuskespilModule)
},
  {
    path        : 'assistent',
    canActivate: [AuthGuard],
    loadChildren: () => import('./sider/assistent/assistent.module').then(m => m.AssistentModule)
},
  {
    path        : 'beskeder',
    canActivate: [AuthGuard],
    loadChildren: () => import('./sider/oversigt/besked/besked.module').then(m => m.BeskedModule)
},
{
  path: 'projekt',
  loadChildren: () =>
    import('./sider/projekt/projekt.module').then(m => m.ProjektModule),
  canActivate: [AuthGuard]
},
  {
    path     : 'projekt/projektoversigt',
    component: ProjektOversigtComponent,
    canActivate: [AuthGuard],
    resolve  : {
        scrumboard: ProjektService
    }
},
{
    path     : 'projekt/:boardId/:boardUrl',
    component: BoardComponent,
    resolve  : {
    //    board: BoardResolve
    resolve: boardIdResolver

    }
},
  /* 
  {
    path        : 'oversigt/udvikling',
    loadChildren: () => import('./sider/oversigt/udvikling/udvikling.module').then(m => m.UdviklingModule)
},
  {
    path        : 'oversigt',
    loadChildren: () => import('./sider/oversigt/oversigt.module').then(m => m.OversigtModule)
},*/
{
  path     : 'udvikling',
  component: UdviklingComponent,
  canActivate: [AuthGuard],
  children : [],
  resolve  : {
    data: UdviklingService
  }
},
  {
    path     : 'oversigt',
    component: OversigtComponent,
    canActivate: [AuthGuard],
    children : [],
    resolve  : {
      data: OversigtService
    }
},
{
  path        : 'opgaver/kalender',
  canActivate: [AuthGuard],
  loadChildren: () => import('./sider/tjek/kalender/kalender.module').then(m => m.KalenderModule)
},

{
  path     : 'akademi/kurser',
  component: KurserComponent,
  resolve  : {
      academy: KurserService
  }
},
{
  path     : 'akademi/kurser/:kursusId/:kursusSlug',
  component: KursusComponent,
  canActivate: [AuthGuard],
  resolve  : {
      academy: KursusService
  }
}, 
  {
    path     : '',
    component: KurserComponent,
    children : [],
    resolve  : {
      academy: KurserService
    }
},


    {path: 'talk',
    canActivate: [AuthGuard],
     component: TalkFormComponent}, 
  {path: 'lektion',     canActivate: [AuthGuard],
  component: LektionComponent}, 
  {path: 'bruger', component: BrugerComponent,  canActivate: [AuthGuard] },
  { path: 'chats/:id', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'chats', component: ChatComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forChild(routes)
  ],
  
  exports: [RouterModule]
})
export class AppRoutingModule {}
