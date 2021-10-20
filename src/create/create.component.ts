import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppService } from '../app/app.service';

import { ICreate } from './create.model';
import { IProfile } from '../profile/profile.model';
import * as config from '../../config.json';
import { TokenStorage } from '../app/token-storage.service';

@Component({
    selector: 'bh24-create',
    templateUrl: './create.component.html'
})

export class CreateComponent implements OnInit {

    partnerInfo: ICreate = {
        firstName: '',
        secondName: '',
        country: null,
    };

    dataBaseUrl = config.DATA_BASE_URL;

    leader: IProfile;

    referId: string;

    viewErrorMessage?: boolean = null;
    isLeaderDataAvailable: boolean = false;

    constructor (private apiService: AppService, private router: Router, private aRouter: ActivatedRoute, private tokenService: TokenStorage) { }

    ngOnInit(): void {
        this.aRouter.queryParams.subscribe(params => {
            this.referId = params.referId;

            if (!!this.referId) {
                this.getLeader(this.apiService, this.referId);
            } else {
                this.viewErrorMessage = true;
            }
        });
    }

    emptyFirstName: boolean = false;
    emptySecondName: boolean = false;
    privacyPolicy: boolean = false;
    errorEmptyMessage: boolean = false;
    errorPrivacyPolicyMessage: boolean = false;

    submitClick () {
        this.emptyFirstName = !this.partnerInfo.firstName.length;
        this.emptySecondName = !this.partnerInfo.secondName.length;

        if (!this.emptyFirstName || !this.emptySecondName) {
            if (!this.privacyPolicy) {
                this.errorPrivacyPolicyMessage = true;
            } else {
                this.apiService.getCountry().subscribe((response: any) => {
                    this.partnerInfo.country = response.country.toLowerCase();
                    const data = {...this.partnerInfo, leaderId: this.leader.id};
                    this.router.navigateByUrl(`profile?p=${btoa(JSON.stringify(data))}`);
                });
            }
        } else {
            this.errorEmptyMessage = true;
        }
    }

    private getLeader (apiService: AppService, referId: string) {
        apiService.partnerReadByReferId(referId).subscribe((data: any) => {
            this.leader = {
                id: data.id,
                firstName: data.firstName,
                secondName: data.lastName,
                iconUrl: data.avatarUrl,
                referId: data.refer?.id,
                phoneNumber: data.phoneNumber,
                email: data.email,
                password: '******',
                questionWhoAreYou: data.questions.whoAreYou,
                questionWhy: data.questions.why,
                questionValue: data.questions.value,
                questionStaff: data.questions.staff,
                questionResults: data.questions.results,
                login: data.questions.login,
                facebook: data.contacts.facebook,
                telegram: data.contacts.telegram,
                skype: data.contacts.skype,
                viber: data.contacts.viber,
                vk: data.contacts.vk,
                whatsapp: data.contacts.whatsapp,
                subscription_end: null,
                subscription_name: null,
            }
            this.isLeaderDataAvailable = true;
            this.viewErrorMessage = false;
        });
    }
}
