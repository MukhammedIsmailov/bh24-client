import { Component } from '@angular/core';

import { AppService } from '../app/app.service';

import { ILogin } from './login.model';

@Component({
    selector: 'bh24-login',
    templateUrl: './login.component.html'
})

export class LoginComponent {

    constructor (private apiService: AppService) { }

    login: string = '';
    password: string = '';

    token: string = null;
    notFound: boolean = false;

    submitClick () {
        const data: ILogin = { login: this.login, password: this.password };
        this.apiService.login(data).subscribe((data) => {
            console.log('data', data)
        }, error => {
            if(error.status === 404) {
                this.notFound = true;
            }
        });
    }
}