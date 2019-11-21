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

    create (data: ICreate) {
        return this.http.put('http://localhost:3000/api/partner', data, this._options);
    }

    read () {
        return this.http.get('http://localhost:3000/api/partner?id=2', this._options);
    }


    update (data: any) {
        return this.http.post('http://localhost:3000/api/partner?id=2', { ...data, iconUrl: 'ssdasdasd' }, this._options)
    }

    upload (data: any) {
        console.log(data.name)
        let formData: FormData = new FormData();
        formData.append('avatar', data, data.name);
        console.log(formData)
        // this._options.headers.append('Content-Type', 'multipart/form-data');
        return this.http.post('http://localhost:3000/api/upload', { content: formData }, this._options);
    }
}
