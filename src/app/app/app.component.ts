// src/app/app.component.ts
import browser from 'browser-detect';
import { Title } from '@angular/platform-browser';
import {Component, HostBinding, Input, OnInit} from '@angular/core';
import { environment as env } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

// Sidenav
import { SidenavService } from '../services/sidenav.service';
import { onMainContentChange } from '../animations/animations';
import { onSideNavChange, animateText } from '../animations/animations'

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Location, ViewportScroller } from '@angular/common';
import { Router, Scroll, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
 

import {animate, state, style, transition, trigger} from '@angular/animations';

import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [onSideNavChange, animateText
  ]
})
export class AppComponent implements OnInit {
  expanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;

  logo = require('../../assets/svg/logo.svg');

  navigation = [
    { link: 'lektion', label: 'Lektion', icon: 'schedule',  status: '1' },
    { link: 'assistent', label: 'Beskeder',icon: 'chat',  status: '3' },
        { link: 'opgaver', label: 'Opgaver', icon: 'assignment_ind',  status: '3'},

  ];
  userChats$;

  public sideNavState: boolean = false;
  public onSideNavChange: boolean;

  @Input() opened: boolean;

  isAuthenticated$: Observable<boolean>;
  stickyHeader$: Observable<boolean>;
  language$: Observable<string>;
  theme$: Observable<string>;

  constructor(
    private _sidenavService: SidenavService,
    public auth: AuthService,
    public translate: TranslateService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore
  ) {
    translate.addLangs(['en', 'da', 'ru']);
    translate.setDefaultLang('en');
    this._sidenavService.sideNavState$.subscribe( res => {
      console.log(res)
      this.onSideNavChange = res;
    })


  }


  ngOnInit(): void {
 


  }

  isLargeScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width > 1200) {
        return true;
    } else {
        return false;
    }
  }

 

  switchLang(lang: string) {
    this.translate.use(lang);
  }
 

 
}
