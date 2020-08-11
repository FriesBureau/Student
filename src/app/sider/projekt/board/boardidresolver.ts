import { Injectable } from '@angular/core';
import { ProjektService } from '../../../services/projekt.service';

import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class boardIdResolver implements Resolve<string> {

  constructor(
    private projektservice: ProjektService,
    private route: ActivatedRoute,

    ) { 
    }
    /*
    resolve(route: ActivatedRouteSnapshot) 
    {
  
        return this.projektservice.getBoardnew(route.paramMap.get('boardId'));
      
    }
     */

  resolve(route: ActivatedRouteSnapshot) {
    
    const boardidtjek = route.paramMap.get('boardId');
   console.log('boardidtjek', boardidtjek);
    return boardidtjek;
  }


}