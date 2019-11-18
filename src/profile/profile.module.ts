import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { ProfileComponent }   from './profile.component';

@NgModule({
    imports: [ BrowserModule, FormsModule, HttpClientModule ],
    declarations: [ ProfileComponent ],
})

export class ProfileModule { }