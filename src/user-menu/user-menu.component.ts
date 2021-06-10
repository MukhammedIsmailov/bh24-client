import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Socket } from 'ngx-socket-io';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

import { TokenStorage } from '../app/token-storage.service';
import { AppService } from '../app/app.service';
import { IMe } from './user-menu.model';
import { IFeedbackNotificationDTO } from '../app/app.model';
import { UtilsService } from '../app/utils.service';

import * as config from '../../config.json';

@Component({
    selector: 'bh24-user_menu',
    templateUrl: './user-menu.component.html',
    providers: [DatePipe],
})
export class UserMenuComponent implements OnInit {
    active: boolean = false;
    me: IMe;
    dataBaseUrl = config.DATA_BASE_URL;
    isDataAvailable = false;
    notifications: IFeedbackNotificationDTO[] = [];
    onNotifications: boolean = false;
    prepareSocialNetworking: any = null;

    constructor (private router: Router, private tokenStorage: TokenStorage, private apiService: AppService,
                 /*private socket: Socket,*/ utilsService: UtilsService, private sanitizer: DomSanitizer) {
        this.prepareSocialNetworking = utilsService.prepareSocialNetworking;
    }

    ngOnInit(): void {
        this.apiService.me().subscribe((data: any) => {
            this.me = data;
            this.isDataAvailable = true;
            this.tokenStorage.setSubEnd(data.subscription_end);
        });

        /*this.socket.on('feedbackClick', (msg: IFeedbackNotificationDTO) => {
            this.tokenStorage.getUserId().subscribe((userId) => {
                if (userId === msg.partnerId) {
                    this.notifications.push(msg);
                    this.onNotifications = true;
                }
            });
        });*/
    }

    async logout() {
        this.tokenStorage.clear();
        await this.router.navigateByUrl('/sign-in');
    }

    async bugreport () {
        await this.router.navigateByUrl('/bugreport');
    }

    async update() {
        this.tokenStorage.getUserId().subscribe(async (userId: number) => {
            await this.router.navigateByUrl(`/profile?id=${userId}`);
        });
    }

    async payment(){
        await this.router.navigateByUrl('/payment');
    }

    sanitize(url: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    userMenuActive() {
        this.active = !this.active;
        if (this.active) {
            document.getElementsByClassName('content')[0].classList.add('content_umenu-padding');
            document.getElementsByClassName('header')[0].classList.add('header_umenu-padding');
            if (window.innerWidth < 768) {
                document.getElementsByClassName('sidebar')[0].classList.remove('active');
            }
        } else {
            document.getElementsByClassName('content')[0].classList.remove('content_umenu-padding');
            document.getElementsByClassName('header')[0].classList.remove('header_umenu-padding');
        }
    }
}
