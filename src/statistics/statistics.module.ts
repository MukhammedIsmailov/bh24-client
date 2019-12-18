import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { TooltipModule } from 'ng2-tooltip-directive';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ChartsModule } from 'ng2-charts';

import { StatisticsComponent } from './statistics.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

import { SidebarModule } from '../sidebar/sidebar.module';

@NgModule({
    imports: [ BrowserModule, FormsModule, HttpClientModule, TooltipModule, SimpleNotificationsModule.forRoot(),
        ChartsModule, SidebarModule ],
    declarations: [ StatisticsComponent, SidebarComponent ],
})

export class StatisticsModule { }