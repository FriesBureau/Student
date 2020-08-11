import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { BeskederReducer, BeskederState } from './beskeder.reducer';
import { FoldersReducer, FoldersState } from './folders.reducer';
import { FiltersReducer, FiltersState } from './filters.reducer';
import { LabelsReducer, LabelsState } from './labels.reducer';

export interface BeskedAppState
{
    beskeder: BeskederState;
    folders: FoldersState;
    filters: FiltersState;
    labels: LabelsState;
}

export const getBeskedAppState = createFeatureSelector<BeskedAppState>(
    'app-besked'
);

export const getAppState = createSelector(
    getBeskedAppState,
    (state: BeskedAppState) => state
);

export const reducers: ActionReducerMap<BeskedAppState> = {
    beskeder  : BeskederReducer,
    folders: FoldersReducer,
    filters: FiltersReducer,
    labels : LabelsReducer
};

export * from './beskeder.reducer';
export * from './folders.reducer';
export * from './filters.reducer';
export * from './labels.reducer';
