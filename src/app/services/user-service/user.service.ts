import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Platform} from '@ionic/angular';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

export const LANGUAGE_KEY = 'language';
export const TOKEN_KEY = 'token';
export const PHOTO_URL_KEY = 'photoUrl';
export const USER_CLUBS_KEY = 'clubs';

export interface UserStateModel {
    userId: number;
    clubs: ClubStateModel[];
    photoUrl: string;
}

export interface ClubStateModel {
    clubId: number;
    name: string;
    photoUrl: string;
    description: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    authenticationState = new BehaviorSubject(true);
    userKeys = ['userId', 'clubs', 'photoUrl'];

    constructor(
        private readonly storage: Storage,
        private readonly plt: Platform,
        private readonly router: Router) {
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

    async getToken() {
        return await this.storage.get(TOKEN_KEY);
    }

    getPhotoUrl() {
        return this.storage.get(PHOTO_URL_KEY);
    }

    setData(data: UserStateModel) {
        console.log(data);
        for(const key in data) {
            this.storage.set(key, data[key]);
        }
    }

    async getData(): Promise<UserStateModel> {
        const res = {};

        for(const key of this.userKeys) {
            res[key] = await this.storage.get(key);
        }

        return res as UserStateModel;
    }
}
