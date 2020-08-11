import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of, forkJoin } from 'rxjs';
import { catchError, debounceTime, map, mergeMap, exhaustMap, withLatestFrom } from 'rxjs/operators';

import { getRouterState, State } from '../../../../../store/reducers';
import { getBeskederState } from '../selectors';
import * as BeskederActions from '../actions/beskeder.actions';
import * as fromRoot from '../../../../../store';

import { Besked } from '../../../../../model/besked.model';
import { BeskedService } from '../../../../../services/besked.service';

@Injectable()
export class BeskederEffect
{
    routerState: any;

    constructor(
        private actions: Actions,
        private beskedService: BeskedService,
        private store: Store<State>
    )
    {
        this.store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if ( routerState )
                {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Beskeder with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getBeskeder: Observable<BeskederActions.BeskederActionsAll> =
        this.actions
            .pipe(
                ofType<BeskederActions.GetBeskeder>(BeskederActions.GET_BESKEDER),
                exhaustMap((action) => {

                    let handle = {
                        id   : '',
                        value: ''
                    };

                    const routeParams = of('labelHandle', 'filterHandle', 'folderHandle');
                    routeParams.subscribe(param => {
                        if ( this.routerState.params[param] )
                        {
                            handle = {
                                id   : param,
                                value: this.routerState.params[param]
                            };
                        }
                    });

                    return this.beskedService.getBeskeder(handle)
                               .pipe(
                                   map((beskeder: Besked[]) => {

                                       return new BeskederActions.GetBeskederSuccess({
                                           loaded: handle,
                                           beskeder : beskeder
                                       });
                                   }),
                                   catchError(err => of(new BeskederActions.GetBeskederFailed(err)))
                               );
                })
            );

    /**
     * Update Besked
     * @type {Observable<any>}
     */
    @Effect()
    updateBesked: Observable<{}> =
        this.actions
            .pipe(
                ofType<BeskederActions.UpdateBesked>(BeskederActions.UPDATE_BESKED),
                exhaustMap((action) => {
                    return this.beskedService.updateBesked(action.payload).pipe(
                        map(() => {
                            return new BeskederActions.UpdateBeskedSuccess(action.payload);
                        })
                    );
                })
            );

    /**
     * UpdateBeskeder
     * @type {Observable<any>}
     */
    @Effect()
    updateBeskeder: Observable<BeskederActions.BeskederActionsAll> =
        this.actions
            .pipe(
                ofType<BeskederActions.UpdateBeskeder>(BeskederActions.UPDATE_BESKEDER),
                exhaustMap((action) => {
                    return forkJoin(action.payload.map(besked => this.beskedService.updateBesked(besked))).pipe(map(() => {
                        return new BeskederActions.UpdateBeskederSuccess();
                    }));
                })
            );

    /**
     * Set Current Besked
     * @type {Observable<SetCurrentBeskedSuccess>}
     */
    @Effect()
    setCurrentBesked: Observable<Action> =
        this.actions
            .pipe(
                ofType<BeskederActions.SetCurrentBesked>(BeskederActions.SET_CURRENT_BESKED),
                withLatestFrom(this.store.pipe(select(getBeskederState))),
                map(([action, state]) => {
                    return new BeskederActions.SetCurrentBeskedSuccess(state.entities[action.payload]);
                })
            );

    /**
     * Check Current Besked
     * Navigate to parent directory if not exist in besked list
     * Update Current Besked if exist in besked list
     * @type {Observable<any>}
     */
    @Effect()
    checkCurrentBesked: Observable<Action> =
        this.actions
            .pipe(
                ofType<BeskederActions.CheckCurrentBesked>(BeskederActions.CHECK_CURRENT_BESKED),
                withLatestFrom(this.store.pipe(select(getBeskederState))),
                map(([action, state]) => {

                    if ( this.routerState.params.beskedId && !state.entities[this.routerState.params.beskedId] )
                    {
                       return new fromRoot.Go({path: [this.routerState.url.replace(this.routerState.params.beskedId, '')]});
                    }

                    return new BeskederActions.SetCurrentBeskedSuccess(state.entities[this.routerState.params.beskedId]);
                })
            );

    /**
     * On Get Beskeder Success
     * @type {Observable<CheckCurrentBesked>}
     */
    @Effect()
    getBeskederSuccess: Observable<BeskederActions.BeskederActionsAll> =
        this.actions
            .pipe(
                ofType<BeskederActions.GetBeskederSuccess>(BeskederActions.GET_BESKEDER_SUCCESS),
                mergeMap(() =>
                    [
                        new BeskederActions.CheckCurrentBesked()
                    ])
            );
    /**
     * On Update Beskeder Success
     * @type {Observable<DeselectAllBeskeder | GetBeskeder>}
     */
    @Effect()
    updateBeskederSuccess: Observable<BeskederActions.BeskederActionsAll> =
        this.actions
            .pipe(
                ofType<BeskederActions.UpdateBeskederSuccess>(BeskederActions.UPDATE_BESKEDER_SUCCESS),
                mergeMap(() =>
                    [
                        new BeskederActions.DeselectAllBeskeder(),
                        new BeskederActions.GetBeskeder()
                    ])
            );
    /**
     * On Update Besked Success
     * @type {Observable<GetBeskeder>}
     */
    @Effect()
    updateBeskedSuccess: Observable<BeskederActions.BeskederActionsAll> =
        this.actions
            .pipe(
                ofType<BeskederActions.UpdateBeskederSuccess>(BeskederActions.UPDATE_BESKED_SUCCESS),
                debounceTime(500),
                map(() => {
                    return new BeskederActions.GetBeskeder();
                })
            );

    /**
     * Set Folder on Selected Beskeder
     * @type {Observable<UpdateBeskeder>}
     */
    @Effect()
    setFolderOnSelectedBeskeder: Observable<BeskederActions.BeskederActionsAll> =
        this.actions
            .pipe(
                ofType<BeskederActions.SetFolderOnSelectedBeskeder>(BeskederActions.SET_FOLDER_ON_SELECTED_BESKEDER),
                withLatestFrom(
                    this.store.pipe(select(getBeskederState))),
                map(([action, state]) => {
                    const entities = {...state.entities};
                    let beskederToUpdate = [];
                    state.selectedBeskedIds
                         .map(id => {
                             beskederToUpdate = [
                                 ...beskederToUpdate,
                                 entities[id] = {
                                     ...entities[id],
                                     folder: action.payload
                                 }
                             ];
                         });
                    return new BeskederActions.UpdateBeskeder(beskederToUpdate);
                })
            );

    /**
     * Add Label on Selected Beskeder
     * @type {Observable<UpdateBeskeder>}
     */
    @Effect()
    addLabelOnSelectedBeskeder: Observable<BeskederActions.BeskederActionsAll> =
        this.actions
            .pipe(
                ofType<BeskederActions.AddLabelOnSelectedBeskeder>(BeskederActions.ADD_LABEL_ON_SELECTED_BESKEDER),
                withLatestFrom(this.store.pipe(select(getBeskederState))),
                map(([action, state]) => {

                    const entities = {...state.entities};
                    let beskederToUpdate = [];

                    state.selectedBeskedIds
                         .map(id => {

                             let labels = [...entities[id].labels];

                             if ( !entities[id].labels.includes(action.payload) )
                             {
                                 labels = [...labels, action.payload];
                             }

                             beskederToUpdate = [
                                 ...beskederToUpdate,
                                 entities[id] = {
                                     ...entities[id],
                                     labels
                                 }
                             ];
                         });

                    return new BeskederActions.UpdateBeskeder(beskederToUpdate);
                })
            );
}
