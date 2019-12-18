import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../app/app.service';
import { TokenStorage } from '../app/token-storage.service';

import { ILogin } from './login.model';

@Component({
    selector: 'bh24-login',
    templateUrl: './login.component.html'
})

export class LoginComponent {

    constructor (private apiService: AppService, private router: Router, private tokenStorage: TokenStorage) { }

    login: string = '';
    password: string = '';

    token: string = null;
    notFound: boolean = false;

    submitClick () {
        const data: ILogin = { login: this.login, password: this.password };
        this.apiService.login(data).subscribe(async (data: any) => {
            this.tokenStorage.setAccessToken(data.token);
            this.tokenStorage.setUserId(data.userId);
            await this.router.navigateByUrl('/cabinet');
        }, error => {
            if(error.status === 404) {
                this.notFound = true;
            }
        });
    }
}