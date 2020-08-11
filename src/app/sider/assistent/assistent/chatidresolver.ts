import { Injectable } from '@angular/core';
import { AssistentService } from '../../../services/assistent.service';

import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class chatIdResolver implements Resolve<string> {

  constructor(
    private assist: AssistentService,
    private route: ActivatedRoute,

    ) { 
    }
  

  resolve(route: ActivatedRouteSnapshot) {
    const chatidtjek = route.paramMap.get('id');
   console.log('chatidtjek', chatidtjek);
    return chatidtjek;
  }
 
}