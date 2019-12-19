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
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CabinetComponent } from '../cabinet/cabinet.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { EducationComponent } from '../education/education.component';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { PromotionComponent } from '../promotion/promotion.component';

import { AppService } from './app.service';
import { NotificationService } from './notification.service';
import { TokenStorage } from './token-storage.service'

const appRoutes: Routes =[
    { path: 'sign-in', component: LoginComponent},
    { path: 'create', component: CreateComponent},
    { path: 'profile', component: ProfileComponent },
    { path: 'statistics', component: StatisticsComponent },
    { path: 'cabinet', component: CabinetComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'education', component: EducationComponent },
    { path: 'promotion', component: PromotionComponent },
];

@NgModule({
    imports: [ BrowserModule, FormsModule, HttpClientModule, TooltipModule, RouterModule.forRoot(appRoutes),
        ReactiveFormsModule, SimpleNotificationsModule.forRoot(), BrowserAnimationsModule,
        ChartsModule, Ng2FlatpickrModule],
    declarations: [ AppComponent, LoginComponent, CreateComponent, ProfileComponent, StatisticsComponent,
        SidebarComponent, CabinetComponent, CalendarComponent, EducationComponent, UserMenuComponent, PromotionComponent],
    bootstrap: [ AppComponent ],
    providers: [ AppService, NotificationService, { provide: APP_BASE_HREF, useValue : '/' }, TokenStorage ]
})

export class AppModule { }