import { Action } from '@ngrx/store';
import { Dictionaries } from './dictionaries.models';

export enum DictionariesActionTypes {
    READ = '[Dictionaries] Read',
    READ_SUCCESS = '[Dictionaries] Read Success',
    READ_FAILURE = '[Dictionaries] Read Failure',
}

export class Read implements Action {
    readonly type = DictionariesActionTypes.READ;

    constructor() { }
}

export class ReadSuccess implements Action {
    readonly type = DictionariesActionTypes.READ_SUCCESS;

    constructor(public payload: Dictionaries) { }
}

export class ReadFailure implements Action {
    readonly type = DictionariesActionTypes.READ_FAILURE;

    constructor(public error: string) { }
}

export type DictionariesActions = Read | ReadSuccess | ReadFailure;