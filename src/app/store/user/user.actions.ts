import { Action } from '@ngrx/store';
import { User, EmailPasswordCredentials } from './user.models';

export enum Types {
    INIT = '[User] Init',
    INIT_AUTHORIZED = '[User] Init Authorized',
    INIT_UNAUTHORIZED = '[User] Init Unauthorized',
    INIT_ERROR = '[User] Init Error',

    SIGN_IN = '[User] Sign In',
    SIGN_IN_SUCCESS = '[User] Sign In Success',
    SIGN_IN_ERROR = '[User] Sign In Failure',

    SIGN_OUT = '[User] Sign Out',
    SIGN_OUT_SUCCESS = '[User] Sign Out Success',
    SIGN_OUT_ERROR = '[User] Sign Out Failure',

    SIGN_UP = '[User] Sign Up',
    SIGN_UP_SUCCESS = '[User] Sign Up Success',
    SIGN_UP_ERROR = '[User] Sign Up Failure',
}

/* Init */
export class Init implements Action {
    readonly type = Types.INIT;
    constructor() { }
}

export class InitAuthorized implements Action {
    readonly type = Types.INIT_AUTHORIZED;
    constructor(public uid: string, public user: User | null) { }
}

export class InitUnauthorized implements Action {
    readonly type = Types.INIT_UNAUTHORIZED;
    constructor() { }
}

export class InitError implements Action {
    readonly type = Types.INIT_ERROR;
    constructor(public error: string) { }
}

/* Inicio de sesion */
export class SignIn implements Action {
    readonly type = Types.SIGN_IN;
    constructor(public payload: EmailPasswordCredentials) { }
}

export class SignInSuccess implements Action {
    readonly type = Types.SIGN_IN_SUCCESS;
    constructor(public uid: string, public user: User | null) { }
}

export class SignInError implements Action {
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
    constructor(public uid: string) { }
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

export type All = SignIn | SignInSuccess | SignInError | 
    SignUp | SignUpSuccess | SignUpError | 
    SignOut | SignOutSuccess | SignOutError |
    Init | InitAuthorized | InitUnauthorized | InitError;
