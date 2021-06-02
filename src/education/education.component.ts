import { Component } from '@angular/core';
import { IPage } from './education.model';
import { AppService } from '../app/app.service';

@Component({
    selector: 'bh24-education',
    templateUrl: './education.component.html'
})

export class EducationComponent {
    page: IPage;
    constructor (private apiService: AppService) {}

    ngOnInit (): void {
        this.apiService.pageReadByName('education').subscribe((data: IPage) => {
            this.page = data;
        });
    }
}
