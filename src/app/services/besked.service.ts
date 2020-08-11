import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Besked } from '../model/besked.model';
import { BeskedAppState } from '../sider/oversigt/besked/store/reducers';
import { getFiltersArr, getFoldersArr, getLabelsArr, getBeskederArr } from '../sider/oversigt/besked/store/selectors';

@Injectable({
  providedIn: 'root'
})
export class BeskedService
{
    foldersArr: any;
    filtersArr: any;
    labelsArr: any;
    selectedBeskeder: Besked[];
    beskeder: Besked[];

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     * @param {Store<BeskedAppState>} _store
     */
    constructor(
        private _httpClient: HttpClient,
        private _store: Store<BeskedAppState>
    )
    {
        this._store
            .pipe(select(getFoldersArr))
            .subscribe(folders => {
                this.foldersArr = folders;
            });

        this._store
            .pipe(select(getFiltersArr))
            .subscribe(filters => {
                this.filtersArr = filters;
            });

        this._store
            .pipe(select(getLabelsArr))
            .subscribe(labels => {
                this.labelsArr = labels;
            });

        this._store
            .pipe(select(getBeskederArr))
            .subscribe(beskeder => {
                this.beskeder = beskeder;
            });

        this.selectedBeskeder = [];
    }

    /**
     * Get all Beskeder
     *
     * @returns {Observable<Besked[]>}
     */
    getAllBeskeder(): Observable<Besked[]>
    {
        return this._httpClient.get<Besked[]>('api/besked-beskeder');
    }

    /**
     * Get folders
     *
     * @returns {Observable<any>}
     */
    getFolders(): Observable<any>
    {
        return this._httpClient.get('api/besked-folders');
    }

    /**
     * Get filters
     *
     * @returns {Observable<any>}
     */
    getFilters(): Observable<any>
    {
        return this._httpClient.get('api/besked-filters');
    }

    /**
     * Get labels
     *
     * @returns {Observable<any>}
     */
    getLabels(): Observable<any>
    {
        return this._httpClient.get('api/besked-labels');
    }

    /**
     * Get Beskeder
     *
     * @param handle
     * @returns {Observable<Besked[]>}
     */
    getBeskeder(handle): Observable<Besked[]>
    {
        if ( handle.id === 'labelHandle' )
        {
            const labelId = this.labelsArr.find(label => label.handle === handle.value).id;
            return this._httpClient.get<Besked[]>('api/besked-beskeder?labels=' + labelId);
        }
        else if ( handle.id === 'filterHandle' )
        {
            return this._httpClient.get<Besked[]>('api/besked-beskeder?' + handle.value + '=true');
        }
        else // folderHandle
        {
            const folderId = this.foldersArr.find(folder => folder.handle === handle.value).id;
            return this._httpClient.get<any>('api/besked-beskeder?folder=' + folderId);
        }
    }

    /**
     * Update the besked
     *
     * @param besked
     * @returns {Promise<any>}
     */
    updateBesked(besked): any
    {
        return this._httpClient.post('api/besked-beskeder/' + besked.id, {...besked});
    }
}
