import { Component } from '@angular/core';
import { IPage } from './education.model';
import { AppService } from '../app/app.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'bh24-education',
    templateUrl: './education.component.html'
})

export class EducationComponent {
    page: IPage;
    constructor (private apiService: AppService, private sanitizer: DomSanitizer) {}

    ngOnInit (): void {
        this.apiService.pageReadByName('education').subscribe((data: IPage) => {
            data.content.forEach((item: any) => item.body = this.sanitizer.bypassSecurityTrustHtml(item.body))
            data.content.sort((a, b) => a.id - b.id);
            this.page = data;
        });
    }
}
