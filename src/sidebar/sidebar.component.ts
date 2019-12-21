import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItems, routes } from './sidebar.model';

@Component({
    selector: 'bh24-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
    menuItemsEnum = MenuItems;
    activeMenuItem = MenuItems.Cabinet;
    active = false;

    constructor (private router: Router) { }

    sidebarActive() {
        this.active = !this.active;
        if (this.active) {
            document.getElementsByClassName('content')[0].classList.add('content_sidebar-padding');
        } else {
            document.getElementsByClassName('content')[0].classList.remove('content_sidebar-padding');
        }
    }

    async goTo(item: MenuItems) {
        this.activeMenuItem = item;
        await this.router.navigateByUrl(routes[item.valueOf()]);
    }
}