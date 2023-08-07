import { Action } from '@ngrx/store';
import { User, EmailPasswordCredentials } from './user.models';

export enum Types {
    SIGN_IN = '[User] Sign In',
    SIGN_IN_SUCCESS = '[User] Sign In Success',
    SIGN_IN_ERROR = '[User] Sign In Failure',

    SIGN_OUT = '[User] Logout',
    SIGN_OUT_SUCCESS = '[User] Logout Success',
    SIGN_OUT_ERROR = '[User] Logout Failure',

    SIGN_UP = '[User] Sign Up',
    SIGN_UP_SUCCESS = '[User] Sign Up Success',
    SIGN_UP_ERROR = '[User] Sign Up Failure',
}

/* Inicio de sesion */
export class Login implements Action {
    readonly type = Types.SIGN_IN;
    constructor(public payload: EmailPasswordCredentials) { }
}

export class LoginSuccess implements Action {
    readonly type = Types.SIGN_IN_SUCCESS;
    constructor(public uid: string, public user: User) { }
}

export class LoginError implements Action {
    readonly type = Types.SIGN_IN_ERROR;
    constructor(public error: string) { }
}

/* Registro de usuario */
export class SignUp implements Action {
    readonly type = Types.SIGN_UP;
    constructor(public payload: EmailPasswordCredentials) { }
}

export class SignUpSuccess implements Action {
    readonly type = Types.SIGN_UP_SUCCESS;
    constructor(public uid: string, public user: User) { }
}

export class SignUpError implements Action {
    readonly type = Types.SIGN_UP_ERROR;
    constructor(public error: string) { }
}

/* Cerrar sesion */
export class SignOut implements Action {
    readonly type = Types.SIGN_OUT;
    constructor() { }
}

export class SignOutSuccess implements Action {
    readonly type = Types.SIGN_OUT_SUCCESS;
    constructor() { }
}

export class SignOutError implements Action {
    readonly type = Types.SIGN_OUT_ERROR;
    constructor(public error: string) { }
}

export type All = Login | LoginSuccess | LoginError | SignUp | SignUpSuccess | SignUpError | SignOut | SignOutSuccess | SignOutError;
