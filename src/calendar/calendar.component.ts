import { Component } from '@angular/core';
import { IPage} from './calendar.model';
import { AppService } from '../app/app.service';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: 'bh24-calendar',
    templateUrl: './calendar.component.html'
})

export class CalendarComponent {
    page: IPage;
    constructor (private apiService: AppService, private sanitizer: DomSanitizer) {}

    ngOnInit (): void {
        this.apiService.pageReadByName('calendar').subscribe((data: IPage) => {
            data.content.forEach(item => item.body = this.sanitizer.bypassSecurityTrustHtml(item.body))
            data.content.sort((a, b) => a.id - b.id);
            this.page = data;
        });
    }
}
