import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'ng2-tooltip-directive';
import { Routes, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from '../login/login.component';
import { CreateComponent } from '../create/create.component';
import { ProfileComponent } from '../profile/profile.component';

import { AppService } from './app.service';
import { NotificationService } from './notification.service';

const appRoutes: Routes =[
    { path: 'sign-in', component: LoginComponent},
    { path: '', component: CreateComponent},
    { path: 'profile', component: ProfileComponent }
];

@NgModule({
    imports: [ BrowserModule, FormsModule, HttpClientModule, TooltipModule, RouterModule.forRoot(appRoutes),
        ReactiveFormsModule, SimpleNotificationsModule.forRoot(), BrowserAnimationsModule],
    declarations: [ AppComponent, LoginComponent, CreateComponent, ProfileComponent ],
    bootstrap: [ AppComponent ],
    providers: [ AppService, NotificationService, { provide: APP_BASE_HREF, useValue : '/' } ]
})

export class AppModule { }