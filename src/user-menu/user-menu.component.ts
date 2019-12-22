import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenStorage } from '../app/token-storage.service';
import { AppService } from '../app/app.service';
import { IMe } from './user-menu.model';

import * as config from '../../config.json';

@Component({
    selector: 'bh24-user_menu',
    templateUrl: './user-menu.component.html'
})
export class UserMenuComponent implements OnInit {
    active: boolean = false;
    me: IMe;
    dataBaseUrl = config.DATA_BASE_URL;
    isDataAvailable = false;

    constructor (private router: Router, private tokenStorage: TokenStorage, private apiService: AppService) { }

    ngOnInit(): void {
        this.apiService.me().subscribe((data: any) => {
            this.me = data;
            this.isDataAvailable = true;
        });
    }

    async logout() {
        this.tokenStorage.clear();
        await this.router.navigateByUrl('/sign-in');
    }

    async update() {
        this.tokenStorage.getUserId().subscribe(async (userId: number) => {
            await this.router.navigateByUrl(`/profile?id=${userId}`);
        });
    }

    userMenuActive() {
        this.active = !this.active;
        if (this.active) {
            document.getElementsByClassName('content')[0].classList.add('content_umenu-padding');
            document.getElementsByClassName('header')[0].classList.add('header_umenu-padding');
        } else {
            document.getElementsByClassName('content')[0].classList.remove('content_umenu-padding');
            document.getElementsByClassName('header')[0].classList.remove('header_umenu-padding');
        }
    }
}