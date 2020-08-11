import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {DatePipe} from '@angular/common';

import { fuseAnimations } from '../../../../animations/animations';
import { DokumenterService } from '../../../..//services/dokumenter.service';

@Component({
  selector: 'app-dokumentliste',
  templateUrl: './dokumentliste.component.html',
  styleUrls: ['./dokumentliste.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class DokumentlisteComponent implements OnInit, OnDestroy
{
    files: any;
    dataSource: FilesDataSource | null;
    displayedColumns = [ 'title',  'extension', 'createdAt', 'detail-button'];
    selected: any;


    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FileManagerService} _fileManagerService
     */
    constructor(
        private dokumenterservice: DokumenterService,
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
        this.dataSource = new FilesDataSource(this.dokumenterservice);

        this.dokumenterservice.onFilesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(files => {
                this.files = files;
            });

        this.dokumenterservice.onFileSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selected => {
                this.selected = selected;
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
     * On select
     *
     * @param selected
     */
    onSelect(selected): void
    {
        this.dokumenterservice.onFileSelected.next(selected);
    }

}

export class FilesDataSource extends DataSource<any>
{
 
    constructor(
        private dokumenterservice: DokumenterService
    )
    {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        return this.dokumenterservice.onFilesChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}
