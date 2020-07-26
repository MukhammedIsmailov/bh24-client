import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'bh24-ariix',
    templateUrl: './ariix.component.html'
})
export class AriixComponent implements OnInit {
    url: string = 'https://drive.google.com/embeddedfolderview?id=1yQ61_abdK9uzK3Co9h3EOR32JAlGgHST#list';
    urlSafe: SafeResourceUrl;

    constructor(private readonly sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }
}
