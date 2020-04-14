import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Platform} from '@ionic/angular';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

export const LANGUAGE_KEY = 'language';
export const TOKEN_KEY = 'token';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    authenticationState = new BehaviorSubject(true);

    constructor(private readonly storage: Storage, private readonly plt: Platform, private readonly router: Router) {
        this.checkToken();
    }

    login(token) {
        return this.storage.set(TOKEN_KEY, token).then(() => {
            this.authenticationState.next(true);
            this.router.navigate(['profile'], { skipLocationChange: true });
        });
    }

    logout() {
        return this.storage.remove(TOKEN_KEY).then(() => {
            this.authenticationState.next(false);
            this.router.navigate(['home']);
        });
    }

    isAuthenticated() {
        return this.authenticationState.value;
    }

    checkToken() {
        return new Promise(resolve => {
            this.storage.get(TOKEN_KEY).then(res => {
                console.log(res);
                if (res) {
                    this.authenticationState.next(true);
                } else {
                    this.authenticationState.next(false);
                }
                resolve(res);
            });
        });
    }

    setLanguage(language: string) {
        return this.storage.set(LANGUAGE_KEY, language);
    }

    async getLanguage() {
        return this.storage.get(LANGUAGE_KEY);
    }

    setToken(token) {
        return this.storage.set(TOKEN_KEY, token);
    }

    getToken() {
        return this.storage.get(TOKEN_KEY);
    }
}
