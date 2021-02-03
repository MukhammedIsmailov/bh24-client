import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppService } from '../app/app.service';

import { ICreate } from './create.model';
import { IProfile } from '../profile/profile.model';
import * as config from '../../config.json';

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

    constructor (private apiService: AppService, private router: Router, private aRouter: ActivatedRoute) { }

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
                    this.partnerInfo.country = !!response.country_code ? response.country_code.toLowerCase() : 'ua';
                    const data = {...this.partnerInfo, leaderId: this.leader.id};
                    this.apiService.partnerCreate(data).subscribe(async (data: any) => {
                        this.router.navigateByUrl(`/profile?id=${data.id}`);
                    }, error => {
                        this.viewErrorMessage = true;
                    });
                });
            }
        } else {
            this.errorEmptyMessage = true;
        }
    }

    private getLeader (apiService: AppService, referId: string) {
        apiService.partnerReadByReferId(referId).subscribe((data: IProfile) => {
            this.leader = data;
            this.isLeaderDataAvailable = true;
            this.viewErrorMessage = false;
        });
    }
}
