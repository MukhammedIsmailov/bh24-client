import { Component, OnInit } from '@angular/core';

import { AppService } from '../app/app.service';
import { ILead } from './promotion.model';
import * as config  from '../../config.json';
import { NotificationService } from "../app/notification.service";
import { TokenStorage } from "../app/token-storage.service";

@Component({
    selector: 'bh24-promotion',
    templateUrl: './promotion.component.html'
})

export class PromotionComponent implements OnInit {
    constructor (private apiService: AppService, private notificationService: NotificationService,
                 private tokenStorage: TokenStorage) {}
    leads: ILead[];
    referId: string;
    isLeadsDataAvailable: boolean = false;
    createPartnerUrl = config.CREATE_PARTNER_URL;
    landingUrl: string ;

    ngOnInit(): void {
        this.apiService.leadsRead().subscribe((data: any) => {
            this.leads = data;
            this.tokenStorage.getReferId().subscribe((referId: string) => {
                this.referId = referId;
                this.landingUrl = `${config.LANDING_URL}?referId=${this.referId}`;
                this.isLeadsDataAvailable = true;
            });
        });
    }

    async copyLink(link: string): Promise<void> {
        await navigator.clipboard.writeText(link);
        this.notificationService.success('Реферальная ссылка', 'Скопирована в буфер обмена!')
    }
}