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
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

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
import { LinksComponent } from '../links/links.component';
import { LessonsComponent } from '../lessons/lessons.component';
import { IndexComponent } from '../index/index.component';

import { AppService } from './app.service';
import { NotificationService } from './notification.service';
import { TokenStorage } from './token-storage.service'

import * as config from '../../config.json';

const appRoutes: Routes =[
    { path: 'sign-in', component: LoginComponent, },
    { path: 'create', component: CreateComponent},
    { path: 'profile', component: ProfileComponent },
    { path: 'statistics', component: StatisticsComponent },
    { path: 'index', component: CabinetComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'education', component: EducationComponent },
    { path: 'links', component: LinksComponent },
    { path: 'lesson', component: LessonsComponent },
    { path: '', component: IndexComponent }
];

const socketConfig: SocketIoConfig = { url: config.SERVER };

@NgModule({
    imports: [ BrowserModule, FormsModule, HttpClientModule, TooltipModule, RouterModule.forRoot(appRoutes),
        ReactiveFormsModule, SimpleNotificationsModule.forRoot(), BrowserAnimationsModule,
        ChartsModule, Ng2FlatpickrModule, SocketIoModule.forRoot(socketConfig) ],
    declarations: [ AppComponent, LoginComponent, CreateComponent, ProfileComponent, StatisticsComponent,
        SidebarComponent, CabinetComponent, CalendarComponent, EducationComponent, UserMenuComponent, LinksComponent,
        LessonsComponent, IndexComponent],
    bootstrap: [ AppComponent ],
    providers: [ AppService, NotificationService, { provide: APP_BASE_HREF, useValue : '/' }, TokenStorage ]
})

export class AppModule { }