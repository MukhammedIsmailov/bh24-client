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
}
