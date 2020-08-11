import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Router} from '@angular/router';
import { AuthService } from '../../../../../services/auth.service';
import { ProjektService } from '../../../../../services/projekt.service';
import { ProjektListe } from '../../../../../model/projektliste.model';
import { Projekt } from '../../../../../model/projekt.model';

@Component({
    selector     : 'board-card',
    templateUrl  : './card.component.html',
    styleUrls    : ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BoardCardComponent implements OnInit
{
    @Input()
    cardId;

    card: any;
    board: any;
    board$: Observable<any>;
    getlists$;
    list$;
    card$;
    hentProjektInfo$;

    /**
     * Constructor
     *
     * @param {ActivatedRoute} _activatedRoute
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private auth: AuthService,
        private _location: Location,
        private projektservice: ProjektService,
        private route: ActivatedRoute,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        if (this.route.snapshot.data.resolve) { 
            this.route.params.subscribe(routeParams => {
                const boardId =  this.route.snapshot.data.resolve;
            this.board$ = this.projektservice.getBoardData(boardId);
            this.getlists$ = this.projektservice.getUserLists();
            const source = this.projektservice.get(boardId);
            this.list$ = this.projektservice.joinLists(source);
            this.card$ = this.projektservice.joinCards(source);

           
                console.log('lav indhentning af data', boardId); 
    });
}


        this.board = this._activatedRoute.snapshot.data.board;
        this.card = this.board.cards.filter((card) => {
            return this.cardId === card.id;
        })[0];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Is the card overdue?
     *
     * @param cardDate
     * @returns {boolean}
     */
    isOverdue(cardDate): boolean
    {
        return moment() > moment(new Date(cardDate));
    }
}
