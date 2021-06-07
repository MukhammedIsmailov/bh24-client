import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {TokenStorage} from '../app/token-storage.service';
import {MenuItems, routes} from './sidebar.model';
import * as config from '../../config.json';

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

    constructor (private router: Router, private tokenStorage: TokenStorage) { }

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
        if (this.isEnabled() || allowUnpayed) {
            this.activeMenuItem = item;
            await this.router.navigateByUrl(routes[item.valueOf()]);
        } else {
            await this.router.navigateByUrl(routes[MenuItems.Payment]);
        }
    }
}
