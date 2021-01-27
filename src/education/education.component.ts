import { Component } from '@angular/core';

@Component({
    selector: 'bh24-education',
    templateUrl: './education.component.html'
})


export class EducationComponent {
    nextPage: boolean = false;

    continueEducation () {
        this.nextPage = true;
    }
}