import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';

import { LeadsComponent } from './leads.component';

@NgModule({
    imports: [ BrowserModule, FormsModule, HttpClientModule],
    declarations: [ LeadsComponent ],
})

export class StatisticsModule { }