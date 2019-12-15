import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../app/app.service';

import { ILogin } from './login.model';

@Component({
    selector: 'bh24-login',
    templateUrl: './login.component.html'
})

export class LoginComponent {

    constructor (private apiService: AppService, private router: Router) { }

    login: string = '';
    password: string = '';

    token: string = null;
    notFound: boolean = false;

    submitClick () {
        const data: ILogin = { login: this.login, password: this.password };
        this.apiService.login(data).subscribe((data) => {
            this.router.navigateByUrl('/statistics')
        }, error => {
            if(error.status === 404) {
                this.notFound = true;
            }
        });
    }
}