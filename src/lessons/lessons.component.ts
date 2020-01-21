import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import videojs from 'video.js';

import { AppService } from '../app/app.service';
import { ILesson, ILeader } from './lessons.model';
import * as config from '../../config.json';

@Component({
    selector: 'bh24-lesson',
    templateUrl: './lessons.component.html'
})

export class LessonsComponent implements OnInit {
    dataBaseUrl = config.VIDEO_BASE_URL;
    lessonId: number;
    userId: number;
    lesson: ILesson;
    leader: ILeader;
    isLessonDataAvailable = false;
    isLeaderDataAvailable = false;
    contactsActive = false;
    player: videojs.Player;
    nextComplete = false;
    isMobile = window.innerWidth < 768;

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
        this.setupPlayer();
    }

    async next() {
        await this.router.navigateByUrl(`/lesson?userId=${this.userId}&lessonId=${this.lessonId+1}`);
        this.nextComplete = false;
        this.setupPlayer();
    }

    previous() {
        this.router.navigateByUrl(`/lesson?userId=${this.userId}&lessonId=${this.lessonId-1}`);
        this.setupPlayer();
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

    setupPlayer() {
        setTimeout(() => {
            this.player = videojs('video-player', { autoplay: true });
            this.player.src(this.dataBaseUrl + this.lesson.video);
            this.player.load();
            this.checkPlayerStatus();
        }, 400);
    }

    checkPlayerStatus() {
        this.player.ready(() => {
            const interval = setInterval(() => {
                const currentTime = this.player.currentTime();
                const duration = this.player.duration();
                if ((currentTime / duration * 100) >= 90) {
                    this.apiService.lessonEvent(this.userId, this.lessonId).subscribe();
                    this.nextComplete = true;
                    clearInterval(interval);
                }
            }, 30000);
        });
    }
}