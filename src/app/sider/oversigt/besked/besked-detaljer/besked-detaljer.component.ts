import { ChangeDetectionStrategy, Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Besked } from '../../../../model/besked.model';
import * as fromStore from '../store';
import { BeskedService } from '../../../../services/besked.service';

@Component({
    selector       : 'besked-detaljer',
    templateUrl    : './besked-detaljer.component.html',
    styleUrls      : ['./besked-detaljer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation  : ViewEncapsulation.None
})
export class BeskedDetaljerComponent implements OnChanges
{
    @Input()
    currentBesked: Besked;

    labels$: Observable<any>;
    besked: Besked;
    showDetails: boolean;

    /**
     * Constructor
     *
     * @param {MailNgrxService} _mailNgrxService
     * @param {Store<MailAppState>} _store
     */
    constructor(
        private _beskedService: BeskedService,
        private _store: Store<fromStore.BeskedAppState>
    )
    {
        // Set the defaults
        this.labels$ = this._store.pipe(select(fromStore.getLabelsArr));
        this.showDetails = false;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On changes
     */
    ngOnChanges(): void
    {
        this.updateModel(this.currentBesked);
        this.markAsRead();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Mark as read
     */
    markAsRead(): void
    {
        if ( this.besked && !this.besked.read )
        {
            this.besked.markRead();
            this.updateBesked();
        }
    }

    /**
     * Toggle star
     *
     * @param event
     */
    toggleStar(event): void
    {
        event.stopPropagation();
        this.besked.toggleStar();
        this.updateBesked();
    }

    /**
     * Toggle important
     *
     * @param event
     */
    toggleImportant(event): void
    {
        event.stopPropagation();
        this.besked.toggleImportant();
        this.updateBesked();
    }

    /**
     * Update model
     *
     * @param data
     */
    updateModel(data): void
    {
        this.besked = !data ? null : new Besked({...data});
    }

    /**
     * Update the mail
     */
    updateBesked(): void
    {
        this._store.dispatch(new fromStore.UpdateBesked(this.besked));
        this.updateModel(this.besked);
    }
}
