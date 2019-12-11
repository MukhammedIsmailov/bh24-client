import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppService } from '../app/app.service';

import { ICreate } from './create.model';
import { IProfile } from "../profile/profile.model";

@Component({
    selector: 'bh24-create',
    templateUrl: './create.component.html'
})

export class CreateComponent implements OnInit {

    partnerInfo: ICreate = {
        firstName: '',
        secondName: '',
    };

    leader: IProfile;

    referId: string;
    userId: number;

    constructor (private apiService: AppService, private router: Router, private aRouter: ActivatedRoute) { }

    ngOnInit(): void {
        this.aRouter.queryParams.subscribe(params => {
            this.referId = params.referId;
            this.userId = parseInt(params.id);
        });

        this.getLeader(this.apiService, this.referId);
    }

    wrongLogin: boolean = false;
    emptyFirstName: boolean = false;
    emptySecondName: boolean = false;
    emptyLogin: boolean = false;
    errorEmptyMessage: boolean = false;

    submitClick () {
        this.emptyFirstName = !this.partnerInfo.firstName.length;
        this.emptySecondName = !this.partnerInfo.secondName.length;

        if (!this.emptyLogin || !this.emptyFirstName || !this.emptySecondName) {
            const data = { ...this.partnerInfo, leaderId: this.leader.id };
            this.apiService.partnerCreate(this.userId, data).subscribe(async (data: any) => {
                this.router.navigateByUrl(`/profile?id=${data.id}`);
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

    private getLeader (apiService: AppService, referId: string) {
        apiService.partnerReadByReferId(referId).subscribe((data: IProfile) => {
            this.leader = data;
        });
    }
}