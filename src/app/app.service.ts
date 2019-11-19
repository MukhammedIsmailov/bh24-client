import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ILogin } from '../login/login.model';
import { ICreate } from '../create/create.model';

@Injectable()
export class AppService {
    constructor (private http: HttpClient) { }

    private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }) };

    // private statusCode: number = 200;
    //
    // /**
    //  * Handle Http operation that failed.
    //  * Let the app continue.
    //  * @param operation - name of the operation that failed
    //  * @param result - optional value to return as the observable result
    //  */
    // private handleError<T>(operation = 'operation', result?: any) {
    //     return (error: any): Observable<any> => {
    //         this.statusCode = error.status;
    //         return from(result);
    //     };
    // }
    //
    // get status() {
    //     return this.statusCode;
    // }

    login(data: ILogin) {
        return this.http.post('http://localhost:3000/api/login', data, this._options);
    }

    create(data: ICreate) {
        return this.http.put('http://localhost:3000/api/partner', data, this._options);
    }

    read() {
        return this.http.get('http://localhost:3000/api/partner?id=2', this._options);
    }
}