import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from '../store/reducers';
import { effects } from '../store/effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('app-besked', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class BeskedStoreModule
{
}
