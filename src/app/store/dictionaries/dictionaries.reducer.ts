import { Dictionaries } from "./dictionaries.models";
import * as fromActions from "./dictionaries.actions";


export interface DictionariesState {
    entities: Dictionaries | null;
    loading: boolean | null;
    error: string | null;
}

export const initialState: DictionariesState = {
    entities: null,
    loading: false,
    error: null
};

export function reducer(state = initialState, action: fromActions.DictionariesActions): DictionariesState {
    switch (action.type) {
        case fromActions.DictionariesActionTypes.READ: {
            return {
                ...state,
                loading: true,
                error: null
            };
        }
        
        case fromActions.DictionariesActionTypes.READ_SUCCESS: {
            return {
                ...state,
                entities: action.payload,
                loading: false,
                error: null
            };
        }

        case fromActions.DictionariesActionTypes.READ_FAILURE: {
            return {
                ...state,
                entities: null,
                loading: false,
                error: action.error
            };
        }

        default: {
            return state;
        }

    }
}