import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {TokenStorage} from "../app/token-storage.service";
import { IPage } from '../calendar/calendar.model';
import { AppService } from '../app/app.service';

@Component({
    selector: 'bh24-ariix',
    templateUrl: './ariix.component.html'
})
export class AriixComponent implements OnInit {
    page: IPage;
    constructor (private apiService: AppService) {}

    ngOnInit (): void {
        this.apiService.pageReadByName('ariix').subscribe((data: IPage) => {
            this.page = data;
        });
    }
}
