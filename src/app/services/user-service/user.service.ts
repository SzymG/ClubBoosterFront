import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export const LANGUAGE_KEY = 'language';
export const TOKEN_KEY = 'token';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private readonly storage: Storage) { }

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
