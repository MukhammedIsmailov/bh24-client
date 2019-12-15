import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { FormControl, FormGroup } from '@angular/forms';

import { AppService } from '../app/app.service';
import { IStatisticsData, IDataset, IWard, IWardOptions } from './statistics.model';

@Component({
    selector: 'bh24-statistics',
    templateUrl: './statistics.component.html',
    providers: [ DatePipe ],
})
export class StatisticsComponent implements OnInit {
    constructor (private apiService: AppService) { }
    baseURL: string = 'http://localhost:3000';
    isStatisticsDataAvailable: boolean = false;
    isWardsDataAvailable: boolean = false;
    plotData: IStatisticsData;
    toPlotDate: Date = new Date();
    fromPlotDate: Date = new Date();
    toWardsDate: Date = new Date();
    fromWardsDate: Date = new Date();

    plotDate: Date[];
    wardsDate: Date[];

    plotFlatpickrOptions: FlatpickrOptions = {
        mode: 'range',
        onClose: () => {
            this.fromPlotDate = this.plotDate[0];
            this.toPlotDate = this.plotDate[1];
            this.getStatistics(this.fromPlotDate, this.toPlotDate);
        },
    };

    wardsFlatpickrOptions: FlatpickrOptions = {
        mode: 'range',
        onClose: () => {
            this.fromWardsDate = this.wardsDate[0];
            this.toWardsDate = this.wardsDate[1];
            this.getWards(this.fromWardsDate, this.toWardsDate);
        },
    };
    chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        tooltips: {
            titleFontSize: 0,
            titleSpacing: 0,
            titleMarginBottom: 0,
            displayColors: false,
        },
        hover: {
        },
        scales: {
            yAxes: [{
                display: false,
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
            }]
        }
    };
    chartType = 'line';

    chartLabels: string[];
    chartData: IDataset;
    rangePlotGroup = new FormGroup({
        rangePlot: new FormControl(),
    });
    rangeWardsGroup = new FormGroup({
        rangeWards: new FormControl(),
    });

    wards: IWard[];

    options: IWardOptions = {
        messengerFilter: null,
        lessonFilter: null,
        statusFilter: null,
        startDateFilter: null,
        endDateFilter: null,
        leadFilter: true,
        partnerFilter: true,
    };

    @ViewChild(BaseChartDirective, { static: false })
    public chart: BaseChartDirective;

    ngOnInit (): void {
        this.fromPlotDate.setDate(this.toPlotDate.getDate() - 30);
        this.fromWardsDate.setDate(this.toWardsDate.getDate() - 30);
        this.getStatistics(this.fromPlotDate, this.toPlotDate);
        this.getWards(this.fromWardsDate, this.toWardsDate);
    }

    updateChart (): void {
        this.chart.update();
    }

    getStatistics (startDate: Date, endDate: Date): void {
        const startTimestamp = Math.round(startDate.getTime() / 1000);
        const endTimestamp = Math.round(endDate.getTime() / 1000);
        this.apiService.statisticsRead(startTimestamp, endTimestamp).subscribe((data: IStatisticsData) => {
            this.plotData = data;
            this.chartLabels = data.plotData.labels;
            this.chartData = data.plotData.dataset;

            this.isStatisticsDataAvailable = true;
        });
    }

    getWards (startDate: Date, endDate: Date): void {
        const startTimestamp = Math.round(startDate.getTime() / 1000).toString();
        const endTimestamp = Math.round(endDate.getTime() / 1000).toString();
        this.options.startDateFilter = startTimestamp;
        this.options.endDateFilter = endTimestamp;
        this.apiService.wardsRead(this.options).subscribe((data: IWard[]) => {
            this.wards = data;
            this.isWardsDataAvailable = true;
        });
    }

    onChangeFilter (): void {
        this.getWards(this.fromWardsDate, this.toWardsDate);
    }
}