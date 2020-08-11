import * as BeskederActions from '../actions/beskeder.actions';
import { Besked } from '../../../../../model/besked.model';

export interface BeskederState
{
    entities?: { [id: number]: Besked };
    currentBesked: any;
    selectedBeskedIds: string[];
    searchText: string;
    loading: boolean;
    loaded: any;
}

export const BeskederInitialState: BeskederState = {
    entities       : {},
    currentBesked    : null,
    selectedBeskedIds : [],
    searchText     : '',
    loading        : false,
    loaded         : false
};

export function BeskederReducer(state = BeskederInitialState, action: BeskederActions.BeskederActionsAll): BeskederState
{
    switch ( action.type )
    {
        case BeskederActions.GET_BESKEDER:
        {
            return {
                ...state,
                loading: true
            };
        }

        case BeskederActions.GET_BESKEDER_SUCCESS:
        {

            const beskeder = action.payload.beskeder;
            const loaded = action.payload.loaded;
            const entities = beskeder.reduce(
                (_entities: { [id: number]: Besked }, besked: Besked) => {
                    return {
                        ..._entities,
                        [besked.id]: besked
                    };
                }, {});

            return {
                ...state,
                entities,
                loading: false,
                loaded
            };
        }

        case BeskederActions.GET_BESKEDER_FAILED:
        {
            return {
                ...state,
                loading: false,
                loaded : false
            };
        }

        case BeskederActions.SET_CURRENT_BESKED_SUCCESS:
        {
            return {
                ...state,
                currentBesked: action.payload
            };
        }

        case BeskederActions.UPDATE_BESKED_SUCCESS:
        {
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [action.payload.id]: action.payload
                }
            };
        }

        case BeskederActions.SET_SEARCH_TEXT:
        {

            return {
                ...state,
                searchText: action.payload
            };
        }

        case BeskederActions.TOGGLE_IN_SELECTED_BESKEDER:
        {

            const beskedId = action.payload;

            let selectedBeskedIds = [...state.selectedBeskedIds];

            if ( selectedBeskedIds.find(id => id === beskedId) !== undefined )
            {
                selectedBeskedIds = selectedBeskedIds.filter(id => id !== beskedId);
            }
            else
            {
                selectedBeskedIds = [...selectedBeskedIds, beskedId];
            }

            return {
                ...state,
                selectedBeskedIds
            };
        }

        case BeskederActions.SELECT_ALL_BESKEDER:
        {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedBeskedIds = arr.map(besked => besked.id);

            return {
                ...state,
                selectedBeskedIds
            };
        }

        case BeskederActions.DESELECT_ALL_BESKEDER:
        {
            return {
                ...state,
                selectedBeskedIds: []
            };
        }

        case BeskederActions.SELECT_BESKEDER_BY_PARAMETER:
        {
            const filter = action.payload;
            const arr = Object.keys(state.entities).map(k => state.entities[k]);
            const selectedBeskedIds = arr.filter(besked => besked[filter.parameter] === filter.value)
                                       .map(besked => besked.id);
            return {
                ...state,
                selectedBeskedIds
            };
        }

        case BeskederActions.SET_FOLDER_ON_SELECTED_BESKEDER:
        {
            const entities = {...state.entities};

            state.selectedBeskedIds.map(id => {
                entities[id] = {
                    ...entities[id],
                    folder: action.payload
                };
            });

            return {
                ...state,
                entities
            };
        }

        default:
            return state;
    }
}
