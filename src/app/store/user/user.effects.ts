import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';

import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, of, zip, from } from 'rxjs';
import { map, switchMap, catchError, take, tap } from 'rxjs/operators';

import { User } from './user.models';

import * as fromActions from './user.actions';

import { environment } from '@src/environments/environment';

import { NotificationService } from '@app/services';

type Action = fromActions.All;

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  signUpEmail: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.SIGN_UP),
      map((action: fromActions.SignUp) => action.payload),
      switchMap((payload) =>
        from(
          this.afAuth.createUserWithEmailAndPassword(
            payload.email,
            payload.password
          )
        ).pipe(
          tap(() => {
            firebase
              .auth()
              .currentUser?.sendEmailVerification(
                environment.actionCodeSettings
              );
          }),
          map(
            (signUpState) =>
              new fromActions.SignUpSuccess(
                signUpState.user ? signUpState.user.uid : ''
              )
          ),
          catchError((error) => {
            this.notificationService.error(error.message);
            return of(new fromActions.SignUpError(error.message));
          })
        )
      )
    )
  );

  signInEmail: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.SIGN_IN),
      map((action: fromActions.SignIn) => action.payload),
      switchMap((payload) =>
        from(
          this.afAuth.signInWithEmailAndPassword(
            payload.email,
            payload.password
          )
        ).pipe(
          switchMap(
            (signInState) =>
            this.afs.doc<User>(`users/${signInState.user ? signInState.user.uid : ''}`).valueChanges().pipe(
                take(1),
                map((user) => new fromActions.SignInSuccess(
                    signInState.user ? signInState.user.uid : '',
                    user ? user : null
                ))
            ),
          ),
          catchError((error) => {
            this.notificationService.error(error.message);
            return of(new fromActions.SignInError(error.message));
          })
        )
      )
    )
  );

  signOutEmail: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.SIGN_OUT),
      switchMap(() =>
        from(
          this.afAuth.signOut()
        ).pipe(
            map(() => new fromActions.SignOutSuccess()),
          catchError((error) => {
            this.notificationService.error(error.message);
            return of(new fromActions.SignOutError(error.message));
          })
        )
      )
    )
  );
}
