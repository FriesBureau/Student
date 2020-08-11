import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { fuseAnimations } from '../../../animations/animations';

import { Opgave } from '../../../model/opgave.model';
import { OpgaveService } from '../../../services/opgave.service';

@Component({
  selector: 'app-opgave',
  templateUrl: './opgave.component.html',
  styleUrls: ['./opgave.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class OpgaveComponent implements OnInit, OnDestroy
{
    hasSelectedOpgaver: boolean;
    isIndeterminate: boolean;
    filters: any[];
    tags: any[];
    searchInput: FormControl;
    currentOpgave: Opgave;

    // Private
    private _unsubscribeAll: Subject<any>;

 
    constructor(
        private opgaveservice: OpgaveService,
 
    )
    {
        // Set the defaults
        this.searchInput = new FormControl('');

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
        this.opgaveservice.onSelectedOpgaverChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedOpgaver => {

setTimeout(() => {
this.hasSelectedOpgaver = selectedOpgaver.length > 0;
this.isIndeterminate = (selectedOpgaver.length !== this.opgaveservice.opgaver.length && selectedOpgaver.length > 0);
                }, 0);
            });

        this.opgaveservice.onFiltersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(folders => {
                this.filters = this.opgaveservice.filters;
            });

        this.opgaveservice.onTagsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(tags => {
                this.tags = this.opgaveservice.tags;
            });

        this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                this.opgaveservice.onSearchTextChanged.next(searchText);
            });

        this.opgaveservice.onCurrentOpgaveChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(([currentOpgave, formType]) => {
                if ( !currentOpgave )
                {
                    this.currentOpgave = null;
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
     * Deselect current todo
     */
    deselectCurrentOpgave(): void
    {
        this.opgaveservice._location.go('opgave/all');
        this.opgaveservice.onCurrentOpgaveChanged.next([null, null]);
      
        
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void
    {
        this.opgaveservice.toggleSelectAll();
    }

    /**
     * Select todos
     *
     * @param filterParameter
     * @param filterValue
     */
    selectOpgaver(filterParameter?, filterValue?): void
    {
        this.opgaveservice.selectOpgaver(filterParameter, filterValue);
    }

    /**
     * Deselect todos
     */
    deselectOpgaver(): void
    {
        this.opgaveservice.deselectOpgaver();
    }

    /**
     * Toggle tag on selected todos
     *
     * @param tagId
     */
    toggleTagOnSelectedOpgaver(tagId): void
    {
        this.opgaveservice.toggleTagOnSelectedOpgaver(tagId);
    }

}

