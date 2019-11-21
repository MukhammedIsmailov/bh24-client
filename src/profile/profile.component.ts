import { Component } from '@angular/core';

import { AppService } from '../app/app.service';

import { IProfile} from "./profile.model";

@Component({
    selector: 'bh24-profile',
    templateUrl: './profile.component.html'
})

export class ProfileComponent {

    messengers: IMessenger[];
    profile: IProfile;
    confirmPassword: string;

    constructor (private apiService: AppService) {
        this.getProfileData(apiService);

        this.messengers = this.setInitialMessengersModel();
        this.profile = this.setInitialProfileModel();
        this.confirmPassword = '';
    }

    wrongConfirmPassword: boolean = false;
    emptyFirstName: boolean = false;
    emptySecondName: boolean = false;
    emptyReferId: boolean = false;
    emptyPhoneNumber: boolean = false;
    emptyEmail: boolean = false;
    emptyPassword: boolean = false;
    errorEmptyMessage: boolean = false;
    passwordIsExist: boolean = false;

    submitClick () {
        this.wrongConfirmPassword = (this.confirmPassword !== this.profile.password) && !this.passwordIsExist;
        this.emptyFirstName = !this.profile.firstName.length || !this.profile.firstName;
        this.emptySecondName = !this.profile.secondName.length || !this.profile.secondName;
        this.emptyReferId = !this.profile.referId ? true : (this.profile.referId.length === 0);
        this.emptyPhoneNumber = !this.profile.phoneNumber ? true : (this.profile.phoneNumber.length === 0);
        this.emptyEmail = !this.profile.email ? true : (this.profile.email.length === 0);
        this.emptyPassword = (!this.passwordIsExist && !this.profile.password || this.profile.password.length === 0);

        if (!this.emptyFirstName && !this.emptySecondName && !this.emptyReferId && !this.emptyPhoneNumber &&
            !this.emptyEmail && !this.emptyPassword && !this.wrongConfirmPassword) {
            const data = this.profile;
            const { password, ...dataWithoutPassword } = data;
            const requestData = !this.passwordIsExist ? data : dataWithoutPassword;
            this.apiService.update(requestData).subscribe((response: IProfile) => {
                this.profile = response;
                this.setMessengersModel(response);
                this.passwordIsExist = this.checkPasswordFromServer(response.password);
            });
        } else {
            this.errorEmptyMessage = true;
        }
    }

    async copyLink () {
        await navigator.clipboard.writeText(`http://bla-bla.bla/${this.profile.referId}`);
    }

    private setMessengersModel (data: IProfile) {
        this.messengers[0].value = data.facebook;
        this.messengers[1].value = data.telegram;
        this.messengers[2].value = data.skype;
        this.messengers[3].value = data.vk;
        this.messengers[4].value = data.viber;
        this.messengers[5].value = data.whatsapp;
    }

    private setInitialMessengersModel () : IMessenger[] {
        return [
            {
                value: null,
                icon: '#icon-fb',
                style: 'svg-icon_icon-fb',
                name: 'fb',
                visible: true
            },
            {
                value: null,
                icon: '#icon-tg',
                style: 'svg-icon_icon-tg',
                name: 'tg',
                visible: true
            },
            {
                value: null,
                icon: '#icon-sk',
                style: 'svg-icon_icon-sk',
                name: 'sk',
                visible: true
            },
            {
                value: null,
                icon: '#icon-vk',
                style: 'svg-icon_icon-vk',
                name: 'vk',
                visible: true
            },
            {
                value: null,
                icon: '#icon-vb',
                style: 'svg-icon_icon-vb',
                name: 'vb',
                visible: true
            },
            {
                value: null,
                icon: '#icon-ws',
                style: 'svg-icon_icon-ws',
                name: 'ws',
                visible: true
            },

        ]
    }

    private setInitialProfileModel () : IProfile {
        return {
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
            login: '',
            facebook: null,
            telegram: null,
            skype: null,
            viber: null,
            vk: null,
            whatsapp: null,
        }
    }

    private getProfileData (apiService: AppService) {
        apiService.read().subscribe((data: IProfile) => {
            this.profile = data;
            this.passwordIsExist = this.checkPasswordFromServer(data.password);
            this.setMessengersModel(data);
        });
    }

    private checkPasswordFromServer (password: string): boolean {
        return !!password && password.length > 0;
    }

    // upload (file: any) {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = (_event) => {
    //         this.image = reader.result;
    //         this.viewImage = true;
    //         console.log(this.image);
    //         console.log(this.viewImage)
    //     }
    // }

    upload (file: File) {
        this.apiService.upload(file).subscribe((data: any) => {
            console.log(data.iconName);
        })
    }
}

interface IMessenger {
    value?: string;
    icon: string;
    style: string;
    name: string;
    visible: boolean;
}