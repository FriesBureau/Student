import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '../../../animations/animations';

import { ProjektService } from '../../../services/projekt.service';
import { Projekt } from '../../../model/projekt.model';

@Component({
  selector: 'projektoversigt',
  templateUrl: './projektoversigt.component.html',
  styleUrls: ['./projektoversigt.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})

export class ProjektOversigtComponent implements OnInit, OnDestroy{

    boards: any[];

    // Private
    private _unsubscribeAll: Subject<any>;
 
    constructor(
        private  _router: Router,
        private projektservice: ProjektService
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
    ngOnInit(): void
    {
        this.projektservice.onBoardsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(boards => {
                this.boards = boards;
            });
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
     * New board
     */
    newBoard(): void
    {
        const newBoard = new Projekt({});
        this.projektservice.createNewBoard(newBoard).then(() => {
            this._router.navigate(['/projekt/' + newBoard.id + '/' + newBoard.url]);
        });
    }
}
