import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { CreateComponent } from './create.component';


@NgModule({
    imports: [ BrowserModule, FormsModule, HttpClientModule ],
    declarations: [ CreateComponent ],
})

export class CreateModule { }