import { Component } from '@angular/core';

import { AppService } from '../app/app.service';

import { ICreate} from "./create.model";

@Component({
    selector: 'bh24-create',
    templateUrl: './create.component.html'
})

export class CreateComponent {

    constructor (private apiService: AppService) { }

    partnerInfo: ICreate = {
        firstName: '',
        secondName: '',
        login: '',
    };

    wrongLogin: boolean = false;
    emptyFirstName: boolean = false;
    emptySecondName: boolean = false;
    emptyLogin: boolean = false;
    errorEmptyMessage: boolean = false;

    submitClick () {
        this.emptyFirstName = !this.partnerInfo.firstName.length;
        this.emptySecondName = !this.partnerInfo.secondName.length;
        this.emptyLogin = !this.partnerInfo.login.length;

        if (!this.emptyLogin || !this.emptyFirstName || !this.emptySecondName) {
            const data = this.partnerInfo;
            this.apiService.create(data).subscribe((data) => {
                console.log('data', data)
            }, error => {
                const typeOfFind = typeof (error.error.find((item: any) => {
                    return (item.field === 'login' && item.error === 'not unique')
                }));

                this.wrongLogin = typeOfFind !== 'undefined';
            });
        } else {
            this.errorEmptyMessage = true;
        }
    }
}