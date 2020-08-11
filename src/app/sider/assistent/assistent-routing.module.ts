import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChattestService } from '../../services/chattest.service';
import { AssistentService } from '../../services/assistent.service';

import { AssistentComponent } from './assistent/assistent.component';
import { AssistentViewComponent } from './assistent/assistent-view/assistent-view.component';
import { chatIdResolver } from './assistent/chatidresolver';


 
const routes: Routes = [
  { path: ':id', component: AssistentComponent,
  children: [],
  resolve: {
      resolve: chatIdResolver
  },
 },

  {
    path: '',
    component: AssistentComponent,
    children: [],
    resolve: {
      resolve: chatIdResolver
  },
  },
 {
    path: '**',
    component: AssistentComponent,
    children: [],
    resolve: {
      resolve: chatIdResolver
  },
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  
  exports: [RouterModule],
  providers: [
    chatIdResolver
  ]
})
export class AssistentRoutingModule {}
