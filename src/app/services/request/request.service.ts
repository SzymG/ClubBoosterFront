import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import 'rxjs-compat/add/operator/catch';
import {UserService} from '../user-service/user.service';

@Injectable({
    providedIn: 'root'
})
export class RequestService {
    private baseUrl = 'https://murmuring-sea-67113.herokuapp.com/api/';
    private headers: HttpHeaders;

    constructor(
        private readonly http: HttpClient,
        private readonly translateService: TranslateService,
        private readonly userService: UserService
    ) {
        this.userService.getToken().then((token) => {
            if (token) {
                this.headers = new HttpHeaders().append('Authorization', token);
            }
        });
    }

    post(url, body, params = {}): Observable<any> {
        const locale = this.translateService.currentLang;
        const options = {
            params,
            headers: this.headers
        };

        return this.http.post<any>(`${this.baseUrl}${url}`, {...body, locale}, options)
            .catch(e => {
                if (e.status === 401) {
                    return ['unauthorized'];
                }
            });
    }

    get(url, params = {}): Observable<any> {
        const options = {
            params,
            headers: this.headers
        };

        return this.http.get<any>(`${this.baseUrl}${url}`, options);
    }

    put(url, body, params = {}): Observable<any> {
        const options = {
            params,
            headers: this.headers
        };

        return this.http.put<any>(`${this.baseUrl}${url}`, body, options);
    }

    delete(url, params = {}): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}${url}`, params);
    }
}
