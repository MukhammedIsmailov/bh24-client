import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import * as config from '../../config.json';
import { AppService } from '../app/app.service';
import { ILatestRegistration, IStatistics, ILatestRegistrationByLeaders, IPage } from './cabinet.model';
import { DomSanitizer } from '@angular/platform-browser';

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
    isPageDataAvailable: boolean = false;
    latestRegistrations: ILatestRegistration;
    laatestRegistrationByLeaders: ILatestRegistrationByLeaders[];
    statistics: any;
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
    stat: any;

    constructor (private apiService: AppService, private router: Router, private sanitizer: DomSanitizer) {}

    ngOnInit(): void {
        this.apiService.getStatistics({}).subscribe(async (data: any) => {
            this.latestRegistrations = {
                registrations: data.map((item: any) => ({
                    firstName: item.user.firstName,
                    secondName: item.user.lastName,
                    createdDate: item.subscriptionDate,
                    country: item.user.country
                })),
                count: data.length
            }
            this.users = data;
            this.stat = {
                sc: this.users.length,
                cf: 0,
                fb: this.users.filter(user => !!user.consultationOrderingDate).length,
                pa: this.users.filter(user => user.status == 'client' || user.status == 'partner').length
            }
            this.statistics = {
                                vl: {
                                    value: 'н/д',
                                    percent: 1
                                },
                                sc: {
                                    value: this.stat.sc,
                                    percent: 100,
                                },
                                cf: {
                                    value: 'н/д',
                                    percent: 0,
                                },
                                fb: {
                                    value: this.stat.fb,
                                    percent: this.stat.fb / this.stat.sc * 100,
                                },
                                pa: {
                                    value: this.stat.pa,
                                    percent: this.stat.pa / this.stat.sc * 100
                                }
            };
            this.isStatisticsDataAvailable = true;
            this.isRegistrationsDataAvailable = true;
//             this.apiService.statisticsRead(null, null, null).subscribe(async (data: any) => {
//                 const vl = data.counts[0].VL;
//                 const percent = 100;
//
//                 this.statistics = {
//                     vl: {
//                         value: vl,
//                         percent
//                     },
//                     sc: {
//                         value: this.stat.sc,
//                         percent: ((this.stat.sc - this.stat.cf) / vl) * percent,
//                     },
//                     cf: {
//                         value: this.stat.cf,
//                         percent: (this.stat.cf / vl) * percent,
//                     },
//                     fb: {
//                         value: this.stat.fb,
//                         percent: (this.stat.fb / vl) * percent,
//                     },
//                     pa: {
//                         value: this.stat.pa,
//                         percent: (this.stat.pa / vl) * percent
//                     }
//                 };
//                 this.isStatisticsDataAvailable = true;
//                 this.isRegistrationsDataAvailable = true;
//             });
        });
        /*this.apiService.latestRegistrationsRead().subscribe((data: ILatestRegistration) => {
            this.latestRegistrations = data;
            this.isRegistrationsDataAvailable = true;
        });
        this.apiService.latestRegistrationsByLeadersRead(this.registrationByLeadersConfig[0].interval)
            .subscribe((data: ILatestRegistrationByLeaders[]) => {
            this.laatestRegistrationByLeaders = data;
            this.isRegistrationsByLeadersDataAvailable = true;
        });*/

        this.apiService.pageReadByName('main').subscribe((data: IPage) => {
            data.content.forEach((item: any) => item.body = this.sanitizer.bypassSecurityTrustHtml(item.body))
            this.page = data;
            this.isPageDataAvailable = true;
        });
        this.setTopLeaders(0);
    }

    setTopLeaders (tabItem: number) {
        this.apiService.getAllStatistics().subscribe(async (data: any) => {
            let leaders: Array<any> = [];
            for (const item of data) {
                const leaderId = item.referId;
                const leaderIndex = leaders.findIndex(item => item.id == leaderId);
                const date = new Date();
                if (tabItem == 0) {
                    date.setDate(date.getDate() - 7);
                } else if (tabItem == 1) {
                    date.setDate(date.getDate() - 30);
                } else if (tabItem == 2) {
                    date.setDate(date.getDate() - 90);
                }
                if (new Date(item.subscriptionDate) > date) {
                    if (leaderIndex != -1) {
                        leaders[leaderIndex].count++;
                    } else {
                        const leader: any = await this.apiService.partnerReadById(localStorage.userId).toPromise();
                        leaders.push({
                            id: leaderId,
                            firstName: leader.firstName,
                            secondName: leader.secondName,
                            iconUrl: leader.iconUrl,
                            count: 1
                        });
                    }
                }
            }
            this.laatestRegistrationByLeaders = leaders;
            this.isRegistrationsByLeadersDataAvailable = true;
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
        this.setTopLeaders(tabItem);
    }
}
