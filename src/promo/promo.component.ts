import { Component } from '@angular/core';
import { IPage } from '../calendar/calendar.model';
import { AppService } from '../app/app.service';

@Component({
    selector: 'bh24-promo',
    templateUrl: './promo.component.html'
})


export class PromoComponent {
    page: IPage;
    constructor (private apiService: AppService) {}

    ngOnInit (): void {
        this.apiService.pageReadByName('promo').subscribe((data: IPage) => {
            data.content.sort((a, b) => a.id - b.id);
            this.page = data;
        });
    }
}