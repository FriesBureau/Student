import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../../../../services/auth.service';
import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user = this.auth.user$;
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(next, state): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map(user => !!user), // <-- map to boolean 
      tap(loggedIn => {
        if (!loggedIn || this.auth.isLoggedIn == false) {
          console.log('access denied');
          this.router.navigate(['akademi/kurser']);
        }
      })
    );
  }
}
