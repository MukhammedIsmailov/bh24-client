import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {TokenStorage} from '../app/token-storage.service';
import {MenuItems, routes} from './sidebar.model';
import * as config from '../../config.json';
import { AppService } from '../app/app.service';

@Component({
    selector: 'bh24-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
    menuItemsEnum = MenuItems;
    activeMenuItem = MenuItems.Cabinet;
    active = false;
    promotionDrop = false;
    appName: string = config.NAME
    secondPageName: string = config.ADDITIONAL_PAGE_NAME;
    pages: Array<any>;
    systemPages: Array<any>;

    constructor (private router: Router, private tokenStorage: TokenStorage, private apiService: AppService) { }

    ngOnInit () {
        this.apiService.pageReadAll().subscribe((data: any) => {
            this.pages = data.filter((item: any) => !item.isSystem && item.isPublic);
            this.systemPages = data.filter((item: any) => item.isSystem)
        });
    }

    isEnabled (): boolean {
        let result = false;
        const subEndDate = this.tokenStorage.getSubEnd();
        if (subEndDate) {
            result = +new Date(subEndDate) > Date.now();
        }
        return result;
    }

    sidebarActive() {
        this.active = !this.active;
        if (this.active) {
            document.getElementsByClassName('content')[0].classList.add('content_sidebar-padding');
        } else {
            document.getElementsByClassName('content')[0].classList.remove('content_sidebar-padding');
        }
    }

    promotionDropActive() {
        this.promotionDrop = !this.promotionDrop;
    }

    async goTo(item: MenuItems, allowUnpayed?: boolean) {
        await this.router.navigateByUrl(routes[item.valueOf()]);
//         if (this.isEnabled() || allowUnpayed) {
//             this.activeMenuItem = item;
//             await this.router.navigateByUrl(routes[item.valueOf()]);
//         } else {
//             await this.router.navigateByUrl(routes[MenuItems.Payment]);
//         }
    }

    async redirect (pageKey: string, allowUnpayed: boolean) {
        await this.router.navigateByUrl(`/page?key=${pageKey}`);
//         if (allowUnpayed) {
//             await this.router.navigateByUrl(`/page?key=${pageKey}`);
//         } else {
//             if (+new Date(localStorage.subEnd) - +new Date() > 0) {
//                 await this.router.navigateByUrl(`/page?key=${pageKey}`);
//             } else {
//                 await this.router.navigateByUrl(`/payment`);
//             }
//         }
    }

    async redirectSystemPage (pageKey: string) {
        let allow = this.systemPages.find(item => item.name == pageKey).isFree;
        await this.redirect(pageKey, allow);
    }
}
