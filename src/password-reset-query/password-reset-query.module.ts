import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { PasswordResetQueryComponent } from "./password-reset-query.component";

@NgModule({
    imports: [ BrowserModule, FormsModule, HttpClientModule ],
    declarations: [ PasswordResetQueryComponent ]
})
export class PasswordResetQueryModule {}
