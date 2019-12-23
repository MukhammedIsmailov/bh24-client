import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TokenStorage } from './token-storage.service';

@Component({
    selector: 'bh24-app',
    templateUrl: './app.component.html'
})

export class AppComponent {
    constructor (private router: Router, private tokenStorage: TokenStorage) {
        router.events.subscribe(() => {
            this.authorized = tokenStorage.isAuthorized();
        });
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
