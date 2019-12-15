import { Component, OnInit } from '@angular/core';
import {AppService} from "../app/app.service";

import { ILead } from './leads.model';

@Component({
    selector: 'bh24-leads',
    templateUrl: './leads.component.html',
})
export class LeadsComponent implements OnInit {
    constructor (private apiService: AppService) {
    }

    lead: ILead;

    ngOnInit (): void {

    }
}
