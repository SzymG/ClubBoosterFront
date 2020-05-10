import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import 'rxjs-compat/add/operator/catch';

@Injectable({
    providedIn: 'root'
})
export class RequestService {
    private baseUrl = 'https://murmuring-sea-67113.herokuapp.com/api/';

    constructor(
        private readonly http: HttpClient,
        private readonly translateService: TranslateService,
    ) {}

    post(url, body, params = {}): Observable<any> {
        const locale = this.translateService.currentLang;
        return this.http.post<any>(`${this.baseUrl}${url}`, {...body, locale}, params)
            .catch(e => {
                if (e.status === 401) {
                    return ['unauthorized'];
                }
            });
    }

    get(url, params = {}): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}${url}`, params);
    }

    put(url, body, params = {}): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}${url}`, body, params);
    }

    delete(url, params = {}): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}${url}`, params);
    }
}
