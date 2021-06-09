import { Component } from '@angular/core';
import { AppService } from '../app/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'bh24-page',
    templateUrl: './page.component.html'
})
export class PageComponent {
    constructor (private apiService: AppService, private router: Router, private aRouter: ActivatedRoute){}
    page: any;

    ngOnInit () {
        this.aRouter.queryParams.subscribe(params => {
            this.apiService.pageReadByName(params.key).subscribe(response => {
               this.page = response;
            });
        });
    }
}
