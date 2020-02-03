import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import * as config from '../../config.json';
import { AppService } from '../app/app.service';
import { ILatestRegistration, IStatistics, ILatestRegistrationByLeaders } from './cabinet.model';

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

    constructor (private apiService: AppService, private router: Router) {}

    ngOnInit(): void {
        this.apiService.latestRegistrationsRead().subscribe((data: ILatestRegistration) => {
            this.latestRegistrations = data;
            this.isRegistrationsDataAvailable = true;
        });
        this.apiService.latestRegistrationsByLeadersRead(this.registrationByLeadersConfig[0].interval)
            .subscribe((data: ILatestRegistrationByLeaders[]) => {
            this.laatestRegistrationByLeaders = data;
            this.isRegistrationsByLeadersDataAvailable = true;
        });
        this.apiService.statisticsRead(null, null).subscribe((data: IStatistics) => {
            console.log(data);
            const vl = data.counts[0].VL;
            const percent = 100;
            this.statistics = {
                vl: {
                    value: vl,
                    percent,
                },
                sc: {
                    value: data.counts[1].SC - data.counts[2].CF,
                    percent: ((data.counts[1].SC - data.counts[2].CF) / vl) * percent,
                },
                cf: {
                    value: data.counts[2].CF,
                    percent: (data.counts[2].CF / vl) * percent,
                },
                fb: {
                    value: data.counts[3].FB,
                    percent: (data.counts[3].FB / vl) * percent,
                },
                pa: {
                    value: data.counts[4].NP + data.counts[5].NC,
                    percent: ((data.counts[4].NP + data.counts[5].NC) / vl) * percent;
                }
            };

            this.isStatisticsDataAvailable = true;
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