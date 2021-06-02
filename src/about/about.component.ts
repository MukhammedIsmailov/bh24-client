import {Component} from "@angular/core";
import { IPage } from '../calendar/calendar.model';
import { AppService } from '../app/app.service';

@Component({
    selector: 'bh24-about',
    templateUrl: './about.component.html'
})

export class AboutComponent {
    page: IPage;
    constructor (private apiService: AppService) {}

    ngOnInit (): void {
        this.apiService.pageReadByName('about').subscribe((data: IPage) => {
            this.page = data;
        });
    }
}