import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../app/app.service';
import { TokenStorage } from '../app/token-storage.service';

import { IBugreport} from './bugreport.model';

@Component({
    selector: 'bh24-login',
    templateUrl: './bugreport.component.html'
})

export class BugreportComponent {

    constructor (private apiService: AppService, private router: Router, private tokenStorage: TokenStorage) { }

    contact: string = '';
    message: string = '';
    sent: boolean = false;

    submitClick () {
        const req: IBugreport = { contact: this.contact, message: this.message };
        this.apiService.bugreport(req).subscribe(async (data: any) => {
            this.sent = true;
        });
    }
}