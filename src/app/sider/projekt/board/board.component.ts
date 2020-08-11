import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { fuseAnimations } from '../../../animations/animations';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ProjektService } from '../../../services/projekt.service';
import { ProjektListe } from '../../../model/projektliste.model';
import { Projekt } from '../../../model/projekt.model';
 

@Component({
    selector     : 'projekt-board',
    templateUrl  : './board.component.html',
    styleUrls    : ['./board.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class BoardComponent implements OnInit, OnDestroy
{
    board: any;
    board$: Observable<any>;
    getlists$;
    list$;
    card$;
    hentProjektInfo$;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private auth: AuthService,
        private _location: Location,
        private projektservice: ProjektService,
        private route: ActivatedRoute,
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
   public ngOnInit()
    {
 
        if (this.route.snapshot.data.resolve) { 
            this.route.params.subscribe(routeParams => {
                const boardId =  this.route.snapshot.data.resolve;
         
            this.board$ = this.projektservice.getBoardData(boardId);
              /*     this.getlists$ = this.projektservice.getUserLists();
            const source = this.projektservice.get(boardId);
          this.list$ = this.projektservice.joinLists(source);
            this.card$ = this.projektservice.joinCards(source);
           
                console.log('lav indhentning af data', boardId); 
                */
    });
}
 
       
        }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On list add
     *
     * @param newListName
     */
    onListAdd(newListName): void
    {
        if ( newListName === '' )
        {
            return;
        }

        this.projektservice.addList(new ProjektListe({name: newListName}));
    }

    /**
     * On board name changed
     *
     * @param newName
     */
    onBoardNameChanged(newName): void
    {
        this.projektservice.updateBoard();
        this._location.go('/apps/scrumboard/boards/' + this.board.id + '/' + this.board.url);
    }

    /**
     * On drop
     *
     * @param ev
     */
    onDrop(ev): void
    {
        this.projektservice.updateBoard();
    }
}
