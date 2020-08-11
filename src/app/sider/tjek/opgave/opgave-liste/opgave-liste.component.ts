import { Component, OnDestroy, OnInit, ViewEncapsulation, NgModule } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { fuseAnimations } from '../../../../animations/animations';

import { Opgave } from '../../../../model/opgave.model';
import { OpgaveService } from '../../../../services/opgave.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'opgave-liste',
  templateUrl: './opgave-liste.component.html',
  styleUrls: ['./opgave-liste.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class OpgaveListeComponent implements OnInit, OnDestroy
{
    opgaver: Opgave[];
    currentOpgave: Opgave;
    alert;

    // Private
    private _unsubscribeAll: Subject<any>;

 
    constructor(
        private _activatedRoute: ActivatedRoute,
        private opgaveservice: OpgaveService,
        private _location: Location
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
        // Subscribe to update todos on changes


        this.opgaveservice.onOpgaverChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(opgaver => {
                this.opgaver = opgaver;
            });

        // Subscribe to update current todo on changes
        this.opgaveservice.onCurrentOpgaveChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentOpgave => {
                if ( !currentOpgave )
                {
                    // Set the current todo id to null to deselect the current todo
                    this.currentOpgave = null;

                    // Handle the location changes
                    const tagHandle    = this._activatedRoute.snapshot.params.tagHandle,
                          filterHandle = this._activatedRoute.snapshot.params.filterHandle;

                    if ( tagHandle )
                    {
                        this._location.go('opgave/tag/' + tagHandle);
                    }
                    else if ( filterHandle )
                    {
                        this._location.go('opgave/filter/' + filterHandle);
                    }
                    else
                    {
                        this._location.go('opgave/all');
                    }
                }
                else
                {
                    this.currentOpgave = currentOpgave;
                }
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
     * Read todo
     *
     * @param todoId
     */
    readOpgave(opgaveId): void
    {
        // Set current todo
      
        this.opgaveservice.setCurrentOpgave(opgaveId);
        this.opgaveservice.getUserOpgave(opgaveId);

    }

    /**
     * On drop
     *
     * @param ev
     */
    onDrop(ev): void
    {

    }
}
