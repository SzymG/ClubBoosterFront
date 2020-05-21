import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import 'rxjs-compat/add/operator/catch';
import {UserService} from '../user-service/user.service';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable({
    providedIn: 'root'
})
export class RequestService {
    private baseUrl = 'https://murmuring-sea-67113.herokuapp.com/api/';

    constructor(
        private readonly http: HttpClient,
        private readonly translateService: TranslateService,
        private readonly userService: UserService
    ) {}

    post(url, body, params = {}): Observable<any> {

        return Observable.fromPromise((this.userService.getToken())).mergeMap(token => {
            const locale = this.translateService.currentLang;
            const headers = token ? new HttpHeaders().append('Authorization', token) : null;
            const options = {
                params,
                headers
            };

            return this.http.post<any>(`${this.baseUrl}${url}`, {...body, locale}, options)
                .catch(e => {
                    if (e.status === 401) {
                        return ['unauthorized'];
                    } else if (e.status === 403) {
                        return ['forbidden'];
                    }
                });
        });
    }

    get(url, params = {}): Observable<any> {

        return Observable.fromPromise((this.userService.getToken())).mergeMap(token => {
            const headers = token ? new HttpHeaders().append('Authorization', token) : null;
            const options = {
                params,
                headers
            };

            return this.http.get<any>(`${this.baseUrl}${url}`, options)
                .catch(e => {
                    if (e.status === 401) {
                        return ['unauthorized'];
                    } else if (e.status === 403) {
                        return ['forbidden'];
                    }
                });
        });
    }

    put(url, body, params = {}): Observable<any> {

        return Observable.fromPromise((this.userService.getToken())).mergeMap(token => {
            const headers = token ? new HttpHeaders().append('Authorization', token) : null;
            const options = {
                params,
                headers
            };

            return this.http.put<any>(`${this.baseUrl}${url}`, body, options);
        });
    }

    delete(url, params = {}): Observable<any> {

        return Observable.fromPromise((this.userService.getToken())).mergeMap(token => {
            const headers = token ? new HttpHeaders().append('Authorization', token) : null;
            const options = {
                params,
                headers
            };

            return this.http.delete<any>(`${this.baseUrl}${url}`, options);
        });
    }
}
