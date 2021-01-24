import { Component } from "@angular/core";
import {AppService} from "../app/app.service";
import {Router} from "@angular/router";
import {TokenStorage} from "../app/token-storage.service";
import { IPasswordResetQuery } from "./password-reset-query.model";

@Component({
    selector: 'bh24-password-reset-query',
    templateUrl: './password-reset-query.component.html'
})
export class PasswordResetQueryComponent {
    constructor (private apiService: AppService, private router: Router) { }

    email: string = '';

    notFound: boolean = false;

    sent: boolean = false;

    submitClick () {
        const data: IPasswordResetQuery = { email: this.email };
        this.apiService.resetPasswordQuery(data.email).subscribe(async (data: any) => {
            this.sent = true;
        }, error => {
            if(error.status === 404) {
                this.notFound = true;
            }
        });
    }
}