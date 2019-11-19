import { Component } from '@angular/core';

import { AppService } from '../app/app.service';

import { IProfile} from "./profile.model";

@Component({
    selector: 'bh24-profile',
    templateUrl: './profile.component.html'
})

export class ProfileComponent {

    constructor (private apiService: AppService) {
        apiService.read().subscribe((data: IProfile) => {
            this.profile = data;
        })
    }

    private behappyBase = 'behappy24.com/';

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
    };

    confirmPassword = '';

    wrongConfirmPassword: boolean = false;
    emptyFirstName: boolean = false;
    emptySecondName: boolean = false;
    emptyReferId: boolean = false;
    emptyPhoneNumber: boolean = false;
    emptyEmail: boolean = false;
    errorEmptyMessage: boolean = false;

    image: any = null;

    viewImage: boolean = false;

    submitClick () {
        this.wrongConfirmPassword = (this.confirmPassword !== this.profile.password);
        this.emptyFirstName = !this.profile.firstName.length || !this.profile.firstName;
        this.emptySecondName = !this.profile.secondName.length || !this.profile.secondName;
        this.emptyReferId = !this.profile.referId ? true : (this.profile.referId.length === 0);
        this.emptyPhoneNumber = !this.profile.phoneNumber ? true : (this.profile.phoneNumber.length === 0);
        this.emptyEmail = !this.profile.email ? true : (this.profile.email.length === 0);

        console.log(this.profile.referId)

        if (!this.emptyFirstName || !this.emptySecondName || !this.emptyReferId || !this.emptyPhoneNumber || !this.emptyEmail) {

        } else {
            this.errorEmptyMessage = true;
        }
    }

    async copyLink () {
        await navigator.clipboard.writeText(`${this.behappyBase}${this.profile.referId}`);
    }


    upload (file: any) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
            this.image = reader.result;
            this.viewImage = true;
            console.log(this.image);
            console.log(this.viewImage)
        }
    }
}