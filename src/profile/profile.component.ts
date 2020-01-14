import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AppService } from '../app/app.service';
import { NotificationService } from '../app/notification.service';
import { TokenStorage } from '../app/token-storage.service';

import { IProfile } from './profile.model';

import * as config from '../../config.json';

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
    isCopied: boolean;
    dataBaseUrl: string = config.DATA_BASE_URL;

    constructor (private apiService: AppService, private router: Router, private aRouter: ActivatedRoute,
                 private formBuilder: FormBuilder, private notificationService: NotificationService,
                 private tokenStorage: TokenStorage) { }

    ngOnInit(): void {
        this.aRouter.queryParams.subscribe(params => {
            this.partnerId = Number.parseInt(params.id);
            this.getProfileData(this.apiService, this.partnerId);
            this.messengers = this.setInitialMessengersModel();
            this.profile = this.setInitialProfileModel();
            this.confirmPassword = '';
            this.isCopied = false;
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
    emptyQuestionWhoAreYou: boolean = false;
    emptyQuestionWhy: boolean = false;
    emptyQuestionValue: boolean = false;
    emptyQuestionStaff: boolean = false;
    emptyQuestionResults: boolean = false;
    errorEmptyMessage: boolean = false;
    errorInvalidDataMessage: boolean = false;
    passwordIsExist: boolean = false;
    disabledReferId: boolean = false;
    disabledLogin: boolean = false;
    invalidEmail: boolean = false;
    invalidPassword: boolean = false;
    invalidLogin: boolean = false;
    invalidReferId: boolean = false;
    emptyIconUrl: boolean = false;
    notUniqueReferId: boolean = false;
    notUniqueEmail: boolean = false;
    notUniqueLogin: boolean = false;
    previewPhoto: boolean = false;

    onImageSelect (event: any) {
        if (event.target.files.length > 0) {
            const image = event.target.files[0];
            this.uploadForm.get('avatar').setValue(image);

            const formData = new FormData();
            formData.append('avatar', this.uploadForm.get('avatar').value);
            this.apiService.upload(formData).subscribe((response: any) => {
                this.profile.iconUrl = `/icons/${response.imageName}`;
            });
            this.previewPhoto = true;
        }
    }

    submitClick () {
        this.wrongConfirmPassword = (this.confirmPassword !== this.profile.password) && !this.passwordIsExist;
        this.emptyFirstName = !this.profile.firstName.length || !this.profile.firstName;
        this.emptySecondName = !this.profile.secondName.length || !this.profile.secondName;
        this.emptyReferId = !this.profile.referId ? true : (this.profile.referId.length === 0);
        this.emptyPhoneNumber = !this.profile.phoneNumber ? true : (this.profile.phoneNumber.length === 0);
        this.emptyEmail = !this.profile.email ? true : (this.profile.email.length === 0);
        this.emptyPassword = (!this.passwordIsExist && !this.profile.password || this.profile.password.length === 0);
        this.emptyLogin = !this.profile.login ? true : (this.profile.login.length === 0);
        this.emptyQuestionWhoAreYou = !this.profile.questionWhoAreYou ? true : (this.profile.questionWhoAreYou.length === 0);
        this.emptyQuestionValue = !this.profile.questionValue ? true : (this.profile.questionValue.length === 0);
        this.emptyQuestionResults =!this.profile.questionResults ? true : (this.profile.questionResults.length === 0);
        this.emptyQuestionStaff = !this.profile.questionStaff ? true : (this.profile.questionStaff.length === 0);
        this.emptyQuestionWhy = !this.profile.questionWhy ? true : (this.profile.questionWhy.length === 0);
        this.emptyIconUrl = !this.profile.iconUrl ? true : (this.profile.iconUrl.length === 0);
        this.invalidEmail = !this.isValidEmail(this.profile.email);
        this.invalidPassword = !this.isValidPassword(this.profile.password);
        this.invalidLogin = !this.isValidLogin(this.profile.login);
        this.invalidReferId = !this.isValidReferId(this.profile.referId);

        this.errorEmptyMessage =
            this.emptyFirstName || this.emptySecondName || this.emptyReferId || this.emptyPhoneNumber ||
            this.emptyEmail || this.emptyPassword || this.emptyQuestionResults ||
            this.emptyQuestionWhy || this.emptyQuestionStaff || this.emptyQuestionWhoAreYou ||
            this.emptyQuestionValue || this.emptyLogin;

        this.errorInvalidDataMessage =
            this.invalidEmail || this.wrongConfirmPassword || this.invalidPassword || this.invalidLogin ||
            this.invalidReferId;

        if (!this.errorEmptyMessage && !this.errorInvalidDataMessage && !this.emptyIconUrl) {
            const data = this.profile;
            const { password, ...dataWithoutPassword } = data;
            const requestData = !this.passwordIsExist ? data : dataWithoutPassword;
            requestData.facebook = this.messengers[0].value;
            requestData.telegram = this.messengers[1].value;
            requestData.skype = this.messengers[2].value;
            requestData.vk = this.messengers[3].value;
            requestData.viber = this.messengers[4].value;
            requestData.whatsapp = this.messengers[5].value;
            this.apiService.partnerUpdate(this.partnerId, requestData).subscribe((response: IProfile) => {
                if (!!this.tokenStorage.isAuthorized()) {
                    this.profile = response;
                    this.setMessengersModel(response);
                    this.passwordIsExist = this.checkPasswordFromServer(response.password);
                    this.disabledLogin = !this.emptyLogin;
                    this.disabledReferId = true;
                    this.router.navigateByUrl('/cabinet')
                } else {
                    this.router.navigateByUrl('/sign-in');
                }
            }, error => {
                if (error.status === 400 && error.error.length > 0) {
                    this.notUniqueLogin = error.error.find((item: any) => item.field === 'login' && item.error === 'not unique');
                    this.notUniqueEmail = error.error.find((item: any) => item.field === 'email' && item.error === 'not unique');
                    this.showErrorAlert();
                }
            });
            this.errorEmptyMessage = false;
            this.errorInvalidDataMessage = false;
        } else {
            this.showErrorAlert();
        }
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
            referId: '',
            password: '',
            phoneNumber: '',
            questionResults: null,
            questionStaff: null,
            questionValue: null,
            questionWhoAreYou: null,
            questionWhy: null,
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
        apiService.partnerReadById(id).subscribe((data: IProfile) => {
            this.disabledReferId = this.tokenStorage.isAuthorized();
            this.profile = data;
            this.setMessengersModel(data);
            this.disabledLogin = !!this.profile.login && this.profile.login.length > 0;
            this.passwordIsExist = this.checkPasswordFromServer(data.password);
            this.setMessengersModel(data);
        });
    }

    private checkPasswordFromServer (password: string): boolean {
        return !!password && password.length > 0;
    }

    private isValidEmail (email: string) {
        //console.log(email.match(regexp).length > 0);
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const result: boolean = !!email ? re.test(email.toLowerCase()) : false;
        return result;
    };

    private isValidPassword (password: string) {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}/;
        return (re.test(password) && this.confirmPassword) || this.passwordIsExist;
    }

    private isValidLogin (login: string) {
        const re = /(^(?=.*[a-z])|(?=.*[A-Z])|(?=.*[0-9])).{4,}/;
        return re.test(login) || this.disabledLogin;
    }

    private isValidReferId (referId: string) {
        const re = /^[A-Za-z0-9]+$/;
        return re.test(referId) || this.disabledReferId;
    }

    private showErrorAlert () {
        if (this.errorEmptyMessage) {
            this.notificationService.error('Ошибка!', 'Все поля обязательны для заполнения!');
        } else {
            if (this.emptyIconUrl) {
                this.notificationService.error('Ошибка!', 'Звгрузите пожалуйста фотографию профиля!')
            } else {
                if (this.errorInvalidDataMessage) {
                    this.notificationService.error('Ошибка!', 'Проверьте правильность введенных данных и повторите попытку!');
                } else {
                    if (this.notUniqueReferId) this.notificationService.error('Ошибка!', 'Пользователь с таким адресом уже зарегистрирован в системе!');
                    if (this.notUniqueLogin) this.notificationService.error('Ошибка!', 'Пользователь с таким логином уже зарегистрирован в системе!');
                    if (this.notUniqueEmail) this.notificationService.error('Ошибка!', 'Пользователь с таким email уже зарегистрирован в системе!');
                }
            }
        }
    }
}

interface IMessenger {
    value?: string;
    icon: string;
    style: string;
    name: string;
    visible: boolean;
}