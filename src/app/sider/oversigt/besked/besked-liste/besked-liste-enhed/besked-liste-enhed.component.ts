import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BeskedService } from '../../../../../services/besked.service';
import { Besked } from '../../../../../model/besked.model';
import * as fromStore from '../../store';

@Component({
    selector       : 'besked-liste-enhed',
    templateUrl    : './besked-liste-enhed.component.html',
    styleUrls      : ['./besked-liste-enhed.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation  : ViewEncapsulation.None
})
export class BeskedListeEnhedComponent implements OnInit
{
    @Input() besked: Besked;
    @HostBinding('class.selected') selected: boolean;
    @HostBinding('class.unread') unread: boolean;
    labels$: Observable<any>;
    selectedBeskedIds$: Observable<any>;

    /**
     * Constructor
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {MailNgrxService} _mailNgrxService
     * @param {Store} _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _beskedService: BeskedService,
        private _store: Store<fromStore.BeskedAppState>
    )
    {
        this.labels$ = this._store.pipe(select(fromStore.getLabelsArr));
        this.selectedBeskedIds$ = this._store.pipe(select(fromStore.getSelectedBeskedIds));
        this.selected = false;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void
    {
        // Set the initial values
        this.besked = new Besked(this.besked);
        this.unread = !this.besked.read;

        this.selectedBeskedIds$.subscribe((selectedBeskedIds) => {
            this.selected = selectedBeskedIds.length > 0 && selectedBeskedIds.find(id => id === this.besked.id) !== undefined;
            this.refresh();
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    refresh(): void
    {
        this._changeDetectorRef.markForCheck();
    }

    onSelectedChange(): void
    {
        this._store.dispatch(new fromStore.ToggleInSelectedBeskeder(this.besked.id));
    }
}
