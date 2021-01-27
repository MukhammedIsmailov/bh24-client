import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AppService } from '../app/app.service';
import { NotificationService } from '../app/notification.service';
import { TokenStorage } from '../app/token-storage.service';


import * as config from '../../config.json';

@Component({
    selector: 'bh24-payment',
    templateUrl: './payment.component.html'
})

export class PaymentComponent implements OnInit {
    constructor (private apiService: AppService){}

    payed: boolean;
    subscription_name: string;
    agreementChecked: boolean = false;

    async ngOnInit(){
        const user: any = await this.apiService.me().toPromise();
        this.payed = !!((+new Date(user.subscription_end) - +new Date) > 0);
        this.subscription_name = user.subscription_name;
        console.log(user)
    }

    async buy(productId: number){
        const resp: any = await this.apiService.paymentCreate(productId, false).toPromise();
        location.href = resp.checkout_url;
    }
}