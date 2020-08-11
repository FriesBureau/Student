import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
    HttpClientModule,
    HttpClient,
    HTTP_INTERCEPTORS
  } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { storeFreeze } from 'ngrx-store-freeze';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';

import { environment } from '../../environments/environment';
import { reducers, effects, CustomSerializer } from '../store';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TitleService } from '../services/title.service';



export {
    TitleService
  };


  export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }
  

export const metaReducers: MetaReducer<any>[] = !environment.production
? [storeFreeze]
: [];

@NgModule({
    imports  : [
        StoreModule.forRoot(reducers, {metaReducers}),
        EffectsModule.forRoot(effects),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        StoreRouterConnectingModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: httpTranslateLoader,
              deps: [HttpClient]
            }
          })
    ],
    providers: [
        {
            provide : RouterStateSerializer,
            useClass: CustomSerializer
        }
    ],
    exports: [TranslateModule]
})


export class AppStoreModule
{
    
}
