import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

// import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { TranslationLoaderService } from '../../../services/translation-loader.service';

import { Besked } from '../../../model/besked.model';
import { BeskedService } from '../../../services/besked.service';
import * as fromStore from './store';
 
import { locale as danish } from '../../../i18n/da';
import { locale as english } from '../../../i18n/en';
import { locale as russian } from '../../../i18n/ru';
 

@Component({
  selector: 'app-besked',
  templateUrl: './besked.component.html',
  styleUrls: ['./besked.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation  : ViewEncapsulation.None
})
export class BeskedComponent implements OnInit, OnDestroy
{
    hasSelectedBeskeder: boolean;
    isIndeterminate: boolean;
    searchInput: FormControl;
    beskeder$: Observable<any>;
    folders$: Observable<any>;
    labels$: Observable<any>;
    currentBesked$: Observable<Besked>;
    selectedBeskedIds$: Observable<string[]>;
    searchText$: Observable<string>;
    beskeder: Besked[];
    selectedBeskedIds: string[];

    /**
     * Constructor
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {MailNgrxService} _mailNgrxService
     * @param {Store<MailAppState>} _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
     //   private _fuseSidebarService: FuseSidebarService,
        private _TranslationLoaderService: TranslationLoaderService,
        private _beskedservice: BeskedService,
        private _store: Store<fromStore.BeskedAppState>
    )
    {
        // Set the defaults
        this.searchInput = new FormControl('');
        this._TranslationLoaderService.loadTranslations(danish, english, russian);
        this.currentBesked$ = this._store.pipe(select(fromStore.getCurrentBesked));
        this.beskeder$ = this._store.pipe(select(fromStore.getBeskederArr));
        this.folders$ = this._store.pipe(select(fromStore.getFoldersArr));
        this.labels$ = this._store.pipe(select(fromStore.getLabelsArr));
        this.selectedBeskedIds$ = this._store.pipe(select(fromStore.getSelectedBeskedIds));
        this.searchText$ = this._store.pipe(select(fromStore.getSearchText));
        this.beskeder = [];
        this.selectedBeskedIds = [];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.beskeder$.subscribe(beskeder => {
            this.beskeder = beskeder;
        });

        this.selectedBeskedIds$
            .subscribe(selectedBeskedIds => {
                this.selectedBeskedIds = selectedBeskedIds;
                this.hasSelectedBeskeder = selectedBeskedIds.length > 0;
                this.isIndeterminate = (selectedBeskedIds.length !== this.beskeder.length && selectedBeskedIds.length > 0);
                this.refresh();
            });

        this.searchText$.subscribe(searchText => {
            this.searchInput.setValue(searchText);
        });

        this.searchInput.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged()
        ).subscribe(searchText => {
            this._store.dispatch(new fromStore.SetSearchText(searchText));
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        this._changeDetectorRef.detach();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle select all
     *
     * @param ev
     */
    toggleSelectAll(ev): void
    {
        ev.preventDefault();

        if ( this.selectedBeskedIds.length && this.selectedBeskedIds.length > 0 )
        {
            this.deselectAllBeskeder();
        }
        else
        {
            this.selectAllBeskeder();
        }
    }

    /**
     * Select all mails
     */
    selectAllBeskeder(): void
    {
        this._store.dispatch(new fromStore.SelectAllBeskeder());
    }

    /**
     * Deselect all mails
     */
    deselectAllBeskeder(): void
    {
        this._store.dispatch(new fromStore.DeselectAllBeskeder());
    }

    /**
     * Select mails by parameter
     *
     * @param parameter
     * @param value
     */
    selectBeskederByParameter(parameter, value): void
    {
        this._store.dispatch(new fromStore.SelectBeskederByParameter({
            parameter,
            value
        }));
    }

    /**
     * Toggle label on selected mails
     *
     * @param labelId
     */
    toggleLabelOnSelectedBeskeder(labelId): void
    {
        this._store.dispatch(new fromStore.AddLabelOnSelectedBeskeder(labelId));
    }

    /**
     * Set folder on selected mails
     *
     * @param folderId
     */
    setFolderOnSelectedBeskeder(folderId): void
    {
        this._store.dispatch(new fromStore.SetFolderOnSelectedBeskeder(folderId));
    }

    /**
     * Deselect current mail
     */
    deselectCurrentBesked(): void
    {
        this._store.dispatch(new fromStore.SetCurrentBesked(''));
    }

    /**
     * Refresh
     */
    refresh(): void
    {
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    /*
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    } */
}
