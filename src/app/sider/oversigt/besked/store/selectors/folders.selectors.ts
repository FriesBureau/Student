import { createSelector } from '@ngrx/store';
import { FoldersState, getBeskedAppState, BeskedAppState } from '../reducers';

export const getFoldersState = createSelector(
    getBeskedAppState,
    (state: BeskedAppState) => state.folders
);

export const getFolders = createSelector(
    getFoldersState,
    (state: FoldersState) => state.entities
);

export const getFoldersLoaded = createSelector(
    getFoldersState,
    (state: FoldersState) => state.loaded
);

export const getFoldersArr = createSelector(
    getFolders,
    (entities) => Object.keys(entities).map((id) => entities[id])
);
