import { createSelector } from '@ngrx/store';
import { LabelsState, getBeskedAppState, BeskedAppState } from '../../store/reducers';

export const getLabelsState = createSelector(
    getBeskedAppState,
    (state: BeskedAppState) => state.labels
);

export const getLabels = createSelector(
    getLabelsState,
    (state: LabelsState) => state.entities
);

export const getLabelsLoaded = createSelector(
    getLabelsState,
    (state: LabelsState) => state.loaded
);

export const getLabelsArr = createSelector(
    getLabels,
    (entities) => Object.keys(entities).map((id) => entities[id])
);
