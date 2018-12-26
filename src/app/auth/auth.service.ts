import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    token: string;

    constructor(private router: Router) {}

    singupUser(email: string, password: string) {
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
                       .catch(error => console.log(error));
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
                       .then(response => {
                           this.router.navigate(['/']);
                            firebase.auth().currentUser.getIdToken()
                                                       .then((token: string) => this.token = token);
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
        this.token = null;
    }

    loadUser() {
        firebase.auth().onAuthStateChanged((currentUser) => {
            console.log(currentUser);
            if (currentUser === null) {
                this.token = null;
            }
            else {
                currentUser.getIdToken().then((token: string) => this.token = token);
            }
        });
    }
}