import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import * as config from '../../config.json';
import { AppService } from '../app/app.service';
import { ILatestRegistration, IStatistics, ILatestRegistrationByLeaders, IPage } from './cabinet.model';

@Component({
    selector: 'bh24-cabinet',
    providers: [DatePipe],
    templateUrl: './cabinet.component.html'
})

export class CabinetComponent implements OnInit{
    dataBaseUrl = config.DATA_BASE_URL;
    isRegistrationsDataAvailable: boolean = false;
    isRegistrationsByLeadersDataAvailable: boolean = false;
    isStatisticsDataAvailable: boolean = false;
    latestRegistrations: ILatestRegistration;
    laatestRegistrationByLeaders: ILatestRegistrationByLeaders[];
    statistics: {};
    registrationByLeadersConfig = [
        {
            active: true,
            interval: '7%20days',
        },
        {
            active: false,
            interval: '30%20days',
        },
        {
            active: false,
            interval: '90%20days',
        }
    ];
    page: IPage;
    users: Array<any>;

    constructor (private apiService: AppService, private router: Router) {}

    ngOnInit(): void {
        this.apiService.getStatistics({
            search: '',
            contact: true,
            noncooperation: true,
            client: true,
            partner: true,
            telegram: true,
            facebook: true,
            dateFrom: 1,
            dateTo: 9999999999
        }).subscribe((data: any) => {
            this.latestRegistrations = {
                registrations: data.map((item: any) => ({
                    firstName: item.firstName,
                    secondName: item.lastName,
                    createdDate: item.subscriptionDate,
                    country: item.country
                })),
                count: this.latestRegistrations.registrations.length.toString()
            }
            this.users = data;
        });
        this.apiService.latestRegistrationsRead().subscribe((data: ILatestRegistration) => {
            this.latestRegistrations = data;
            this.isRegistrationsDataAvailable = true;
        });
        this.apiService.latestRegistrationsByLeadersRead(this.registrationByLeadersConfig[0].interval)
            .subscribe((data: ILatestRegistrationByLeaders[]) => {
            this.laatestRegistrationByLeaders = data;
            this.isRegistrationsByLeadersDataAvailable = true;
        });
        this.apiService.statisticsRead(null, null, null).subscribe((data: IStatistics) => {
            const vl = data.counts[0].VL;
            const percent = 100;
            const stat = {
                vl,
                sc: this.users.length,
                cf: this.users.filter(item =>
                    item.lessons.filter((lesson: any) => !!lesson.readingDate).length == 4
                ).length,
                fb: this.users.filter(user => !!user.consultationOrderingDate).length,
                pa: this.users.filter(user => user.status == 'client' || user.status == 'partner').length
            }
            this.statistics = {
                vl: {
                    value: stat.vl,
                    percent
                },
                sc: {
                    value: stat.sc,
                    percent: ((stat.sc - stat.cf) / vl) * percent,
                },
                cf: {
                    value: stat.cf,
                    percent: (stat.cf / vl) * percent,
                },
                fb: {
                    value: stat.fb,
                    percent: (stat.fb / vl) * percent,
                },
                pa: {
                    value: stat.pa,
                    percent: (stat.pa / vl) * percent
                }
            };
            this.isStatisticsDataAvailable = true;

        });

        this.apiService.pageReadByName('main').subscribe((data: IPage) => {
            this.page = data;
        });
    }

    goToStatisticsPage() {
        this.router.navigateByUrl('statistics');
    }

    tabClick(tabItem: number) {
        this.registrationByLeadersConfig.forEach(configItem => {
            configItem.active = false;
        });
        this.registrationByLeadersConfig[tabItem].active = true;
        this.apiService.latestRegistrationsByLeadersRead(this.registrationByLeadersConfig[tabItem].interval)
            .subscribe((data: ILatestRegistrationByLeaders[]) => {
                this.laatestRegistrationByLeaders = data;
            });
    }
}
