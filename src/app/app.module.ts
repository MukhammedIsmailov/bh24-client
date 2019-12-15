import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'ng2-tooltip-directive';
import { Routes, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

import { AppComponent } from './app.component';
import { LoginComponent } from '../login/login.component';
import { CreateComponent } from '../create/create.component';
import { ProfileComponent } from '../profile/profile.component';
import { StatisticsComponent } from '../statistics/statistics.component';

import { AppService } from './app.service';
import { NotificationService } from './notification.service';

const appRoutes: Routes =[
    { path: 'sign-in', component: LoginComponent},
    { path: '', component: CreateComponent},
    { path: 'profile', component: ProfileComponent },
    { path: 'statistics', component: StatisticsComponent }
];

@NgModule({
    imports: [ BrowserModule, FormsModule, HttpClientModule, TooltipModule, RouterModule.forRoot(appRoutes),
        ReactiveFormsModule, SimpleNotificationsModule.forRoot(), BrowserAnimationsModule,
        ChartsModule, Ng2FlatpickrModule],
    declarations: [ AppComponent, LoginComponent, CreateComponent, ProfileComponent, StatisticsComponent ],
    bootstrap: [ AppComponent ],
    providers: [ AppService, NotificationService, { provide: APP_BASE_HREF, useValue : '/' } ]
})

export class AppModule { }