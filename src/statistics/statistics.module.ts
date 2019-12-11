import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { TooltipModule } from 'ng2-tooltip-directive';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { StatisticsComponent } from './statistics.component';

@NgModule({
    imports: [ BrowserModule, FormsModule, HttpClientModule, TooltipModule, SimpleNotificationsModule.forRoot() ],
    declarations: [ StatisticsComponent ],
})

export class StatisticsModule { }