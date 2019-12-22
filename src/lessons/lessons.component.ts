import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { AppService } from '../app/app.service';
import { ILesson, ILeader } from './lessons.model';
import * as config from '../../config.json';

@Component({
    selector: 'bh24-lesson',
    templateUrl: './lessons.component.html'
})

export class LessonsComponent implements OnInit {
    dataBaseUrl = config.DATA_BASE_URL;
    lessonId: number;
    userId: number;
    lesson: ILesson;
    leader: ILeader;
    isLessonDataAvailable = false;
    isLeaderDataAvailable = false;
    contactsActive = false;

    constructor (private apiService: AppService, private router: Router, private aRouter: ActivatedRoute,
                 private sanitizer: DomSanitizer) { }
    ngOnInit(): void {
        this.aRouter.queryParams.subscribe(params => {
           this.lessonId = parseInt(params.lessonId);
           this.userId = parseInt(params.userId);
           this.apiService.lessonRead(this.userId, this.lessonId).subscribe((data: ILesson) => {
               this.lesson = data;
               this.isLessonDataAvailable = true;
           });
           this.apiService.leaderReadByUserId(this.userId).subscribe((data: ILeader) => {
                this.leader = data;
                this.isLeaderDataAvailable = true;
           });
        });
    }

    next() {
        this.router.navigateByUrl(`/lesson?userId=${this.userId}&lessonId=${this.lessonId+1}`);
        this.apiService.lessonEvent(this.userId, this.lessonId+1).subscribe();
    }

    previous() {
        this.router.navigateByUrl(`/lesson?userId=${this.userId}&lessonId=${this.lessonId-1}`);
    }

    sanitize(url: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    feedbackButtonEvent() {
        this.apiService.feedbackButtonClick(this.userId).subscribe(() => {

        });
    }

    contactsSeeEvent() {
        this.apiService.contactsSeeClick(this.userId).subscribe(() => {

        });
    }
}