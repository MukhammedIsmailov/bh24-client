import { Component } from '@angular/core';

import { AppService } from '../app/app.service';

import { IProfile} from "./profile.model";

@Component({
    selector: 'bh24-profile',
    templateUrl: './profile.component.html'
})

export class ProfileComponent {

    constructor (private apiService: AppService) { }

    confirmPassword = '';

    profile: IProfile = {
        firstName: '',
        secondName: '',
        email: '',
        iconUrl: '',
        password: '',
        phoneNumber: '',
        questionResults: null,
        questionStaff: null,
        questionValue: null,
        questionWhoAreYou: null,
        questionWhy: null,
        referId: '',
        login: ''
    }
}