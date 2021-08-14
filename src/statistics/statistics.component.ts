import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { FormControl, FormGroup } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subject} from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { AppService } from '../app/app.service';
import { IStatisticsData, IDataset, IWard, IWardOptions, ILessonInfo, Status } from './statistics.model';

import * as config from '../../config.json';

@Component({
    selector: 'bh24-statistics',
    templateUrl: './statistics.component.html',
    providers: [ DatePipe ],
    animations: [
        trigger('slideUpDown', [
            state('0', style({ 'max-height': '*', opacity: 1 })),
            state('1', style({ 'max-height': '0px', opacity: 0 })),
            transition(':enter', animate('700ms ease-in-out')),
            transition('* => *', animate('700ms ease-in-out')),
        ])
    ]
})
export class StatisticsComponent implements OnInit {
    searchChangedSubject: Subject<string> = new Subject<string>();

    constructor (private apiService: AppService) { }

    dataBaseUrl = config.DATA_BASE_URL;
    isStatisticsDataAvailable: boolean = false;
    isWardsDataAvailable: boolean = false;
    plotData: IStatisticsData;
    toPlotDate: Date = new Date();
    fromPlotDate: Date = new Date();
    intervalForPlot: string = '';
    toWardsDate: Date = new Date();
    fromWardsDate: Date = new Date();

    chartToggleActive: boolean = false;
    filtersToggleActive: boolean = false;

    plotDate: Date[];
    wardsDate: Date[];
    courseEfficiency: number;

    plotFlatpickrOptions: FlatpickrOptions = {
        mode: 'range',
        onClose: () => {
            this.fromPlotDate = !!this.plotDate[0] ? this.plotDate[0] : this.fromPlotDate;
            this.toPlotDate = !!this.plotDate[1] ? this.plotDate[1] : this.toPlotDate;
            this.getStatistics(this.fromPlotDate, this.toPlotDate, null);
            this.getWards(this.fromPlotDate, this.toPlotDate);
            this.intervalsConfig = this.intervalsConfig.map(interval => {
                interval.active = false;
                return interval;
            });
        },
    };

    wardsFlatpickrOptions: FlatpickrOptions = {
        mode: 'range',
        onClose: () => {
            this.fromWardsDate = !!this.wardsDate[0] ? this.wardsDate[0] : this.fromWardsDate;
            this.toWardsDate = this.wardsDate[1] ? this.wardsDate[1] : this.toWardsDate;
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
        facebookFilter: true,
        telegramFilter: true,
        lessonFilter: 'any',
        startDateFilter: null,
        endDateFilter: null,
        clientFilter: true,
        partnerFilter: true,
        renouncementFilter: true,
        contactFilter: true,
        contactsSeeFilter: false,
        searchFilter: null,
        feedbackFilter: false,
    };
    lessonsInfo: ILessonInfo;
    lessonPopupStatus: boolean = false;
    statusPopupStatus: boolean = false;
    filtersPopupStatus: boolean = false;
    currentWard: IWard;
    status = Status;

    intervalsConfig = [
        {
            active: false,
            interval: 'week',
        },
        {
            active: true,
            interval: 'month',
        },
        {
            active: false,
            interval: 'year',
        }
    ];

    @ViewChild(BaseChartDirective, { static: false })
    public chart: BaseChartDirective;

    ngOnInit (): void {
        this.fromPlotDate.setDate(this.toPlotDate.getDate() - 30);
        this.fromWardsDate.setDate(this.toWardsDate.getDate() - 30);
        this.getStatistics(this.fromPlotDate, this.toPlotDate, 'month');
        this.getWards(this.fromWardsDate, this.toWardsDate);

        this.searchChangedSubject
            .pipe(debounceTime(500), distinctUntilChanged())
            .subscribe((searchQuery: string) => {
                this.options.searchFilter = searchQuery;
                this.getWards(this.fromWardsDate, this.toWardsDate);
            });
    }

    updateChart (): void {
        this.chart.update();
    }

    getStatistics (startDate: Date, endDate: Date, interval: string): void {
        const startTimestamp = Math.round(startDate.getTime() / 1000);
        const endTimestamp = Math.round(endDate.getTime() / 1000);
        this.apiService.statisticsRead(startTimestamp, endTimestamp, interval).subscribe((data: IStatisticsData) => {
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
        this.apiService.getStatistics({
            search: this.options.searchFilter,
            facebook: this.options.facebookFilter,
            telegram: this.options.telegramFilter,
            client: this.options.clientFilter,
            partner: this.options.partnerFilter,
            noncooperation: this.options.renouncementFilter,
            contact: this.options.contactFilter,
            contactsSeen: this.options.contactsSeeFilter,
            consultationOrdering: this.options.feedbackFilter,
            dateFrom: this.options.startDateFilter,
            dateTo: this.options.endDateFilter
        }).subscribe((data: any) => {
            this.wards = data.map((item: any) => {
                if (item.status == 'noncooperation') {
                    item.status = 'renouncement';
                }
                return {
                    id: item.id,
                    first_name: item.firstName,
                    second_name: item.lastName,
                    icon_url: '',
                    status: item.status,
                    country: item.country,
                    note: item.note,
                    from: 'telegram',
                    step: item.lessons.length,
                    created_date: item.subscriptionDate,
                    phone_number: item.contact,
                    last_send_time: item.lessons[item.lessons.length - 1].sentDate,
                    role: 'user',
                    username: item.messengerInfo.username,
                    active: !!item.consultationOrderingDate,
                    lessons: item.lessons
                } as IWard;
            }).filter((item: IWard) => {
                if (this.options.lessonFilter == 'any') {
                    return true;
                } else {
                    return !!item.lessons[this.options.lessonFilter].readingDate;
                }
            });
            this.isWardsDataAvailable = true;
        });

    }

    onChangeFilter (): void {
        this.getWards(this.fromPlotDate, this.toPlotDate);
    }

    searchChanged(searchQueryEvent: any): void {
        this.searchChangedSubject.next(searchQueryEvent.target.value);
    }

    openLessonsPopup(id: number) {
        this.lessonPopupStatus = true;
        const user = this.wards.find(item => item.id == id);
        this.lessonsInfo = {
            firstName: user.first_name,
            secondName: user.second_name,
            iconUrl: '',
            lessons: user.lessons.map((item: any) => ({
                lessonNumber: item.lessonId, readingDate: item.readingDate
            }))
        };
    }

    openStatusPopup(ward: IWard) {
        this.statusPopupStatus = true;
        this.currentWard = ward;
    }

    openFiltersPopup() {
        this.filtersToggleActive = !this.filtersToggleActive;
        this.filtersPopupStatus = true;
    }

    saveStatus() {
        this.statusPopupStatus = false;
        this.apiService.updateSubscriber(this.currentWard.id, {
            status: this.currentWard.status == 'renouncement' ? 'noncooperation' : this.currentWard.status,
            note: this.currentWard.note
        }).subscribe(() => {
            this.onChangeFilter();
        });
    }

    saveFilters() {
        this.filtersPopupStatus = false;
        this.onChangeFilter();
    }

    discardFilters() {
        this.filtersPopupStatus = false;
        this.options = {
            facebookFilter: true,
            telegramFilter: true,
            lessonFilter: null,
            startDateFilter: null,
            endDateFilter: null,
            clientFilter: true,
            partnerFilter: true,
            renouncementFilter: true,
            contactFilter: true,
            contactsSeeFilter: true,
            searchFilter: null,
            feedbackFilter: true,
        };
    }
    tabClick(tabItem: number) {
        this.intervalsConfig.forEach(configItem => {
            configItem.active = false;
        });
        this.intervalsConfig[tabItem].active = true;
        const dateFrom = new Date();
        switch (tabItem) {
            case 0:
                dateFrom.setMonth(dateFrom.getMonth() - 1);
                break;
            case 1:
                dateFrom.setMonth(dateFrom.getMonth() - 3);
                break;
            case 2:
                dateFrom.setMonth(dateFrom.getMonth() - 12);
                break;
        }
        this.fromPlotDate = dateFrom;
        this.toPlotDate = new Date();
        this.getStatistics(this.fromPlotDate, this.toPlotDate, null);
        this.getWards(this.fromPlotDate, this.toPlotDate);
    }
}