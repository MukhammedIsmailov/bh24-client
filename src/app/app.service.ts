import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ILogin } from '../login/login.model';
import { ICreate } from '../create/create.model';

@Injectable()
export class AppService {
    constructor(private http: HttpClient) {
    }

    private _options = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        })
    };

    login (data: ILogin) {
        return this.http.post('http://localhost:3000/api/login', data, this._options);
    }

    create (userId: number, data: ICreate) {
        return this.http.put(`http://localhost:3000/api/partner?id=${userId}`, data, this._options);
    }

    readById (id: number) {
        return this.http.get(`http://localhost:3000/api/partner?id=${id}`, this._options);
    }

    readByReferId (referId: string) {
        return this.http.get(`http://localhost:3000/api/partner?referId=${referId}`, this._options);
    }

    update (id: number, data: any) {
        return this.http.post(`http://localhost:3000/api/partner?id=${id}`, { ...data }, this._options)
    }

    upload (data: FormData) {
        return this.http.post('http://localhost:3000/api/upload', data);
    }

    getIP () {
        return this.http.get('https://api.ipify.org?format=json');
    }
}
