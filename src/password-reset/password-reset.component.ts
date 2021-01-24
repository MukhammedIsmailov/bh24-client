import { Component } from "@angular/core";
import { AppService } from "../app/app.service";
import { ActivatedRoute } from '@angular/router';
import { IPasswordReset } from "./password-reset.model";

@Component({
    selector: 'bh24-password-reset',
    templateUrl: './password-reset.component.html'
})
export class PasswordResetComponent {
    constructor (private apiService: AppService, private route: ActivatedRoute) { }

    newPassword: string = '';
    resetPasswordHash: string = ''

    sent: boolean = false;

    ngOnInit () {
        this.route.queryParams.subscribe(params => this.resetPasswordHash = params.resetPasswordHash)
    }

    submitClick () {
        const data: IPasswordReset = { newPassword: this.newPassword, resetPasswordHash: this.resetPasswordHash };
        this.apiService.resetPassword(data).subscribe(async (data: any) => {
            this.sent = true;
        });
    }
}