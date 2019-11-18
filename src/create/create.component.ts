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

    // disabled = this.partnerInfo.firstName.length === 0 || this.partnerInfo.secondName.length  === 0 || this.partnerInfo.login.length == 0;

    submitClick () {
        const data = this.partnerInfo;
        this.apiService.create(data).subscribe((data) => {
            console.log('data', data)
        }, error => {
            const typeOfFind = typeof (error.error.find((item: any) => {
                 return (item.field === 'login' && item.error === 'not unique')
            }));

            this.wrongLogin = typeOfFind !== 'undefined';
        });
    }
}