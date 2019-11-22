import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AppService } from '../app/app.service';

import { IProfile } from './profile.model';

@Component({
    selector: 'bh24-profile',
    templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit {

    messengers: IMessenger[];
    profile: IProfile;
    confirmPassword: string;
    partnerId: number;
    uploadForm: FormGroup;

    constructor (private apiService: AppService, private router: Router, private aRouter: ActivatedRoute, private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.aRouter.queryParams.subscribe(params => {
            this.partnerId = Number.parseInt(params.id);
            this.getProfileData(this.apiService, this.partnerId);
            this.messengers = this.setInitialMessengersModel();
            this.profile = this.setInitialProfileModel();
            this.confirmPassword = '';
        });

        this.uploadForm = this.formBuilder.group({
            avatar: ['']
        });
    }

    wrongConfirmPassword: boolean = false;
    emptyFirstName: boolean = false;
    emptySecondName: boolean = false;
    emptyReferId: boolean = false;
    emptyPhoneNumber: boolean = false;
    emptyEmail: boolean = false;
    emptyPassword: boolean = false;
    emptyLogin: boolean = false;
    errorEmptyMessage: boolean = false;
    passwordIsExist: boolean = false;
    disabledReferId: boolean = false;

    onImageSelect (event: any) {
        if (event.target.files.length > 0) {
            const image = event.target.files[0];
            this.uploadForm.get('avatar').setValue(image);

            const formData = new FormData();
            formData.append('avatar', this.uploadForm.get('avatar').value);
            this.apiService.upload(formData).subscribe((response: any) => {
                this.profile.iconUrl = `http://localhost:3000/icons/${response.imageName}`;
            });
        }
    }

    submitClick () {
        this.wrongConfirmPassword = (this.confirmPassword !== this.profile.password) && !this.passwordIsExist;
        this.emptyFirstName = !this.profile.firstName.length || !this.profile.firstName;
        this.emptySecondName = !this.profile.secondName.length || !this.profile.secondName;
        this.emptyReferId = !this.profile.referId ? true : (this.profile.referId.length === 0);
        this.disabledReferId = !this.emptyReferId;
        this.emptyPhoneNumber = !this.profile.phoneNumber ? true : (this.profile.phoneNumber.length === 0);
        this.emptyEmail = !this.profile.email ? true : (this.profile.email.length === 0);
        this.emptyPassword = (!this.passwordIsExist && !this.profile.password || this.profile.password.length === 0);
        this.emptyLogin = !this.profile.login ? true : (this.profile.login.length === 0);

        if (!this.emptyFirstName && !this.emptySecondName && !this.emptyReferId && !this.emptyPhoneNumber &&
            !this.emptyEmail && !this.emptyPassword && !this.wrongConfirmPassword) {
            const data = this.profile;
            const { password, ...dataWithoutPassword } = data;
            const requestData = !this.passwordIsExist ? data : dataWithoutPassword;
            requestData.facebook = this.messengers[0].value;
            requestData.telegram = this.messengers[1].value;
            requestData.skype = this.messengers[2].value;
            requestData.vk = this.messengers[3].value;
            requestData.viber = this.messengers[4].value;
            requestData.whatsapp = this.messengers[5].value;
            this.apiService.update(this.partnerId, requestData).subscribe((response: IProfile) => {
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
            iconUrl: null,
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

    private getProfileData (apiService: AppService, id: number) {
        apiService.read(id).subscribe((data: IProfile) => {
            this.profile = data;
            this.setMessengersModel(data);
            this.disabledReferId = !!this.profile.referId && this.profile.referId.length > 0;
            this.passwordIsExist = this.checkPasswordFromServer(data.password);
            this.setMessengersModel(data);
        });
    }

    private checkPasswordFromServer (password: string): boolean {
        return !!password && password.length > 0;
    }
}

interface IMessenger {
    value?: string;
    icon: string;
    style: string;
    name: string;
    visible: boolean;
}