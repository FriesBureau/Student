import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {ShufflePipe} from  './shuffle.pipe';
import { HuskespilComponent } from './huskespil.component';
import { MatchingGameComponent } from './matching-game/matching-game.component';
import { Game1Component } from './game1/game1.component';
import { Game2Component } from './game2/game2.component';

const routes: Routes = [
  {
      path     : '**', 
      component: HuskespilComponent
  }
];

@NgModule({
  declarations: [
    HuskespilComponent,
    MatchingGameComponent,
    Game1Component,
    Game2Component,
    ShufflePipe
  ],
  imports     : [
    CommonModule,
    RouterModule.forChild(routes)

  ],
  providers   : [
  ],
  exports     : [
    HuskespilComponent
]
})

export class HuskespilModule { }


