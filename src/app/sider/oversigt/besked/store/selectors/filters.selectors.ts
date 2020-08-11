import { createSelector } from '@ngrx/store';
import { FiltersState, getBeskedAppState, BeskedAppState } from '../reducers';

export const getFiltersState = createSelector(
    getBeskedAppState,
    (state: BeskedAppState) => state.filters
);

export const getFilters = createSelector(
    getFiltersState,
    (state: FiltersState) => state.entities
);

export const getFiltersLoaded = createSelector(
    getFiltersState,
    (state: FiltersState) => state.loaded
);

export const getFiltersArr = createSelector(
    getFilters,
    (entities) => Object.keys(entities).map((id) => entities[id])
);
