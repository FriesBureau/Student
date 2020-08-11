import { FuseUtils } from '../../../../../utils';

import { createSelector } from '@ngrx/store';
import { getBeskedAppState, BeskedAppState, BeskederState } from '../reducers';

export const getBeskederState = createSelector(
    getBeskedAppState,
    (state: BeskedAppState) => state.beskeder
);

export const getBeskeder = createSelector(
    getBeskederState,
    (state: BeskederState) => state.entities
);

export const getBeskederLoaded = createSelector(
    getBeskederState,
    (state: BeskederState) => state.loaded
);

export const getSearchText = createSelector(
    getBeskederState,
    (state: BeskederState) => state.searchText
);

export const getBeskederArr = createSelector(
    getBeskeder,
    getSearchText,
    (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        return FuseUtils.filterArrayByString(arr, searchText);
    }
);

export const getCurrentBesked = createSelector(
    getBeskederState,
    (state: BeskederState) => state.currentBesked
);

export const getSelectedBeskedIds = createSelector(
    getBeskederState,
    (state: BeskederState) => state.selectedBeskedIds
);
