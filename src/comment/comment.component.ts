import {Component, OnInit} from '@angular/core';
import { AppService } from '../app/app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'bh24-comment',
    templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit{
    constructor (private apiService: AppService, private route: ActivatedRoute) { }

    ngOnInit () {

    }

}
