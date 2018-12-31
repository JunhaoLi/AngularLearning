import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';

@Injectable()
export class AuthService {
    token: string;

    constructor(
        private store: Store<fromApp.AppState>,
        private router: Router) {}

    singupUser(email: string, password: string) {
        firebase.auth()
        .createUserAndRetrieveDataWithEmailAndPassword(email, password)
        .then(user => {
            this.store.dispatch(new AuthActions.Signup());
            firebase.auth().currentUser.getIdToken().then((token: string) => this.store.dispatch(new AuthActions.SetToken(token)));
        })
        .catch(error => console.log(error));
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
                       .then(response => {
                           this.store.dispatch(new AuthActions.Signin());
                           this.router.navigate(['/']);
                           firebase.auth().currentUser.getIdToken().then((token: string) => this.store.dispatch(new AuthActions.SetToken(token)));
                        })
                       .catch(error=> console.log(error));
    }

    getToken() {
        // TO DO: make sure token is applicable before return
        firebase.auth().currentUser.getIdToken().then((token: string) => this.token = token);
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }

    logout() {
        firebase.auth().signOut();
        this.store.dispatch(new AuthActions.Logout());
    }

    loadUser() {
        firebase.auth().onAuthStateChanged((currentUser) => {
            if (currentUser === null) {
                this.token = null;
            }
            else {
                currentUser.getIdToken().then((token: string) => this.token = token);
            }
        });
    }
}