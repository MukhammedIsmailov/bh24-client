import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItems, routes } from './sidebar.model';

@Component({
    selector: 'bh24-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
    menuItemsEnum = MenuItems;
    activeMenuItem = MenuItems.Cabinet;

    constructor (private router: Router) { }

    async goTo(item: MenuItems) {
        this.activeMenuItem = item;
        await this.router.navigateByUrl(routes[item.valueOf()]);
    }
}