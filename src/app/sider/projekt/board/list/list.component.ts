import { Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FusePerfectScrollbarDirective } from '../../../../directives/fuse-perfect-scrollbar.directive';
import { AuthService } from '../../../../services/auth.service';
import { ProjektService } from '../../../../services/projekt.service';
import { ProjektKort } from '../../../../model/projektkort.model';
import { CardDialogComponent } from '../dialogs/card/card.component';

@Component({
    selector     : 'board-list',
    templateUrl  : './list.component.html',
    styleUrls    : ['./list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BoardListComponent implements OnInit, OnDestroy
{
    board: any;
    board$: Observable<any>;
    dialogRef: any; 
 
    getlists$;
    list$;
    card$;
    hentProjektInfo$;

    @Input()
    list;
    model;

    @ViewChild(FusePerfectScrollbarDirective, {static: false})
    listScroll: FusePerfectScrollbarDirective;

    confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

    // Private
    private _unsubscribeAll: Subject<any>;

 
    constructor(
        private _activatedRoute: ActivatedRoute,
        private projektservice: ProjektService,
        private auth: AuthService,
        private _matDialog: MatDialog,
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
     * On list name changed
     *
     * @param newListName
     */
    onListNameChanged(newListName): void
    {
        this.list.name = newListName;
    }

    /**
     * On card added
     *
     * @param newCardName
     */
    onCardAdd(newCardName): void
    {
        if ( newCardName === '' )
        {
            return;
        }

        this.projektservice.addCard(this.list.id, new ProjektKort({name: newCardName}));

        setTimeout(() => {
            this.listScroll.scrollToBottom(0, 400);
        });
    }

    /**
     * Remove list
     *
     * @param listId
     */
    removeList(listId): void
    {
        this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete the list and it\'s all cards?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                this.projektservice.removeList(listId);
            }
        });
    }

    /**
     * Open card dialog
     *
     * @param cardId
     */
    openCardDialog(cardId): void
    {
        this.dialogRef = this._matDialog.open(CardDialogComponent, {
            panelClass: 'scrumboard-card-dialog',
            data      : {
                cardId: cardId,
                listId: this.list.id
            }
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {

            });
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
