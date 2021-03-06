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
    clubs: ClubStateModel[];
}

export interface ClubStateModel {
    id: number;
    name: string;
    token: string;
    logo_url: string;
    owner_id: number;
    member_roles: string[];
    s3_presigned_url: string;
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

    async addClub(data: ClubStateModel) {
        let clubs = await this.storage.get(USER_CLUBS_KEY);
        clubs = [...clubs, data];

        this.storage.set(USER_CLUBS_KEY, clubs);
    }
}
