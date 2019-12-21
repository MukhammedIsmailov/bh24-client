import { Component, OnInit } from '@angular/core';

import { AppService } from '../app/app.service';
import * as config  from '../../config.json';
import { NotificationService } from "../app/notification.service";
import { TokenStorage } from "../app/token-storage.service";

@Component({
    selector: 'bh24-links',
    templateUrl: './links.component.html'
})

export class LinksComponent implements OnInit {
    constructor (private apiService: AppService, private notificationService: NotificationService,
                 private tokenStorage: TokenStorage) {}

    isLinksDataAvailable: boolean = false;
    landingUrl: string ;
    createUrl: string;

    ngOnInit(): void {
        this.tokenStorage.getReferId().subscribe((referId: string) => {
            this.createUrl = `${config.CREATE_PARTNER_URL}?referId=${referId}`;
            this.landingUrl = `${config.LANDING_URL}?referId=${referId}`;
            this.isLinksDataAvailable = true;
        });
    }

    async copyLink(link: string): Promise<void> {
        await navigator.clipboard.writeText(link);
        this.notificationService.success('Реферальная ссылка', 'Скопирована в буфер обмена!')
    }
}