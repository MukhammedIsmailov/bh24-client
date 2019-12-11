import { Component, OnInit } from '@angular/core';

import { AppService } from '../app/app.service';
import { IPlotData } from './statistics.model';

@Component({
    selector: 'bh24-statistics',
    templateUrl: './statistics.component.html'
})

export class StatisticsComponent /*implements OnInit*/ {
    plotData: IPlotData;

    constructor (private apiService: AppService) {
        apiService.statisticsRead().subscribe((data: IPlotData) => {
            this.plotData = data;
        });
    }
}