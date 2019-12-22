import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import * as config from '../../config.json';
import { AppService } from '../app/app.service';
import { ILatestRegistration, IStatistics } from './cabinet.model';

@Component({
    selector: 'bh24-cabinet',
    providers: [DatePipe],
    templateUrl: './cabinet.component.html'
})

export class CabinetComponent implements OnInit{
    dataBaseUrl = config.DATA_BASE_URL;
    isRegistrationsDataAvailable: boolean = false;
    isStatisticsDataAvailable: boolean = false;
    latestRegistrations: ILatestRegistration[];
    statistics: {};

    constructor (private apiService: AppService, private router: Router) {}

    ngOnInit(): void {
        this.apiService.latestRegistrationsRead().subscribe((data: ILatestRegistration[]) => {
            this.latestRegistrations = data;
            this.isRegistrationsDataAvailable = true;
        });
        this.apiService.statisticsRead(null, null).subscribe((data: IStatistics) => {
            const vl = data.counts[0].VL;
            const percent = 100;
            this.statistics = {
                vl: {
                    value: vl,
                    percent,
                },
                sc: {
                    value: data.counts[1].SC,
                    percent: ((data.counts[1].SC - data.counts[2].CF) / vl) * 100,
                },
                cf: {
                    value: data.counts[2].CF,
                    percent: (data.counts[2].CF / vl) * 100,
                },
                fb: {
                    value: data.counts[3].FB,
                    percent: (data.counts[3].FB / vl) * 100,
                },
                pa: {
                    value: data.counts[6].PA,
                    percent: (data.counts[6].PA / vl) * 100,
                }
            };

            this.isStatisticsDataAvailable = true;
        });
    }

    goToStatisticsPage() {
        this.router.navigateByUrl('statistics');
    }
}