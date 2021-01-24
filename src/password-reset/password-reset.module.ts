import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { PasswordResetComponent } from "./password-reset.component";

@NgModule({
    imports: [ BrowserModule, FormsModule, HttpClientModule ],
    declarations: [ PasswordResetComponent ]
})
export class PasswordResetModule {}
