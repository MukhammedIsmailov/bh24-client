import { Component } from '@angular/core';
import { IPage} from './calendar.model';
import { AppService } from '../app/app.service';

@Component({
    selector: 'bh24-calendar',
    templateUrl: './calendar.component.html'
})

export class CalendarComponent {
    page: IPage;
    constructor (private apiService: AppService) {}

    ngOnInit (): void {
        this.apiService.pageReadByName('calendar').subscribe((data: IPage) => {
            data.content.sort((a, b) => a.id - b.id);
            this.page = data;
        });
    }
}
