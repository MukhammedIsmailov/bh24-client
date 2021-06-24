import { Component } from '@angular/core';
import { AppService } from '../app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'bh24-page',
    templateUrl: './page.component.html'
})
export class PageComponent {
    constructor (private apiService: AppService, private router: Router, private aRouter: ActivatedRoute, private sanitizer: DomSanitizer){}
    page: any;

    ngOnInit () {
        this.aRouter.queryParams.subscribe(params => {
            this.apiService.pageReadByName(params.key).subscribe((response: any) => {
                response.content.forEach((item: any) => item.body = this.sanitizer.bypassSecurityTrustHtml(item.body))
               this.page = response;
            });
        });
    }
}
