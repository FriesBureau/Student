import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as FiltersActions from '../../store/actions/filters.actions';
import { BeskedService } from '../../../../../services/besked.service';

@Injectable()
export class FiltersEffect
{
    constructor(
        private actions: Actions,
        private beskedService: BeskedService
    )
    {
    }

    /**
     * Get filters from Server
     * @type {Observable<any>}
     */
    @Effect()
    getFilters: Observable<FiltersActions.FiltersActionsAll> =
        this.actions
            .pipe(
                ofType<FiltersActions.GetFilters>(FiltersActions.GET_FILTERS),
                switchMap((action) => {
                        return this.beskedService.getFilters()
                                   .pipe(
                                       map((filters: any) => {
                                           return new FiltersActions.GetFiltersSuccess(filters);
                                       }),
                                       catchError(err => of(new FiltersActions.GetFiltersFailed(err)))
                                   );
                    }
                ));
}
