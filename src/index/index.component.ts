import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorage } from '../app/token-storage.service';

@Component({
    selector: 'bh24-index',
    template: '<div></div>',
})

export class IndexComponent implements OnInit {
    constructor(private tokenStorage: TokenStorage, private router: Router) { }

    ngOnInit(): void {
        if (!!this.tokenStorage.isAuthorized()) {
            this.router.navigateByUrl('index');
        } else {
            this.router.navigateByUrl('sign-in')
        }
    }
}