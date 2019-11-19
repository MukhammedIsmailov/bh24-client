import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'ng2-tooltip-directive';

import { AppComponent } from './app.component';
import { LoginComponent } from '../login/login.component';
import { CreateComponent } from '../create/create.component';
import { ProfileComponent } from '../profile/profile.component';

import { AppService } from './app.service';

@NgModule({
    imports: [ BrowserModule, FormsModule, HttpClientModule, TooltipModule ],
    declarations: [ AppComponent, LoginComponent, CreateComponent, ProfileComponent ],
    bootstrap: [ AppComponent ],
    providers: [ AppService ]
})

export class AppModule { }