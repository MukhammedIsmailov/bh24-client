import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Socket } from 'ngx-socket-io';

import { TokenStorage } from './token-storage.service';
import { IFeedbackNotificationDTO } from './app.model';
import * as config  from '../../config.json';

@Component({
    selector: 'bh24-app',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

    onNotification: boolean = false;

    notificationInfo: IFeedbackNotificationDTO;
    appName: string = config.NAME;

    constructor (private router: Router, private tokenStorage: TokenStorage/*, private socket: Socket*/) {
        router.events.subscribe(() => {
            this.authorized = tokenStorage.isAuthorized();
        });
    }

    ngOnInit(): void {
        /*this.socket.on('feedbackClick', (msg: IFeedbackNotificationDTO) => {
            this.tokenStorage.getUserId().subscribe((userId) => {
                if (userId === msg.partnerId) {
                    this.notificationInfo = msg;
                    this.onNotification = true;

                    setTimeout(() => {
                        this.onNotification = false;

                    }, 10000);
                }
            });
        });*/
    }

    authorized = this.tokenStorage.isAuthorized();

    mobiSidebarActive = false;

    mobileSidebarActive() {
        this.mobiSidebarActive = !this.mobiSidebarActive;
        if(window.innerWidth < 768) {
            document.getElementsByClassName('umenu')[0].classList.remove('active');
            document.getElementsByClassName('content')[0].classList.remove('content_umenu-padding');
            document.getElementsByClassName('header')[0].classList.remove('header_umenu-padding');
            if (this.mobiSidebarActive) {
                document.getElementsByClassName('sidebar')[0].classList.add('active');
            } else {
                document.getElementsByClassName('sidebar')[0].classList.remove('active');
            }
        }
    }


}
