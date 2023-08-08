import { User } from './user.models';
import * as fromActions from './user.actions';

export interface UserState {
    entity: User | null;
    uid: string | null;
    loading: boolean | null;
    error: string | null;
}


const initialState: UserState = {
    entity: null,
    uid: null,
    loading: null,
    error: null
}

export function reducer(state = initialState, action: fromActions.All | any): UserState {
    switch (action.type) {
        case fromActions.Types.SIGN_IN: {
            return {...state,loading: true,error: null}
        }
        case fromActions.Types.SIGN_IN_SUCCESS: {
            return {...state,entity: action.user,uid: action.uid,loading: false}
        }
        case fromActions.Types.SIGN_IN_ERROR: {
            return {...state,loading: false,error: action.error}
        }
        case fromActions.Types.SIGN_UP: {
            return {
                ...state,
                loading: true,
                error: null
            }
        }
        case fromActions.Types.SIGN_UP_SUCCESS: {
            return {
                ...state,
                entity: action.user,
                uid: action.uid,
                loading: false
            }
        }
        case fromActions.Types.SIGN_UP_ERROR: {
            return {...state,loading: false,error: action.error}
        }
        case fromActions.Types.SIGN_OUT: {
            return {...state,loading: true,error: null}
        }
        case fromActions.Types.SIGN_OUT_SUCCESS: {
            return {...initialState,entity: null,uid: null,loading: false}
        }
        case fromActions.Types.SIGN_OUT_ERROR: {
            return {...state,loading: false,error: action.error}
        }
        default: {
            return state;
        }
    }
}