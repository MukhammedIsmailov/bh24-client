import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { TokenStorage } from './token-storage.service';
import * as config  from '../../config.json';
import { ILogin } from '../login/login.model';
import { ICreate } from '../create/create.model';

@Injectable()
export class AppService {
    constructor(private http: HttpClient, private tokenStorage: TokenStorage) {
        tokenStorage.getAccessToken().subscribe((token: string) => {
            this._options = {
                headers: new HttpHeaders({
                    'Authorization': `Bearer ${token}`,
                }),
            }
        });
    }

    private _options = { };

    login (data: ILogin) {
        return this.http.post(`${config.API_BASE_URL}/login`, data, /*this._options*/);
    }

    partnerCreate (userId: number, data: ICreate) {
        return this.http.put(`${config.API_BASE_URL}/partner?id=${userId}`, data, this._options);
    }

    partnerReadById (id: number) {
        return this.http.get(`${config.API_BASE_URL}/partner/byId?id=${id}`);
    }
    partnerReadByReferId (referId: string) {
        return this.http.get(`${config.API_BASE_URL}/partner/byReferId?referId=${referId}`);
    }

    partnerUpdate (id: number, data: any) {
        return this.http.post(`${config.API_BASE_URL}/partner?id=${id}`, { ...data })
    }

    upload (data: FormData) {
        return this.http.post(`${config.API_BASE_URL}/upload`, data);
    }

    statisticsRead (startDate: number, endDate: number) {
        return this.http.get(`${config.API_BASE_URL}/statistics/plot?startDate=${startDate}&endDate=${endDate}`, this._options);
    }

    wardsRead (data: any) {
        return this.http.post(`${config.API_BASE_URL}/wards`, data, this._options);
    }
}
