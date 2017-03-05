import { Component } from "@angular/core";

@Component({
    selector: 'erp-dashboard',
    template: `
    <h2>{{title}}</h2>
    <ul>
        <li>
        <a routerLink="/orders">Order Management</a>
        </li>
        <li>
        <a routerLink="/inventory">Inventory Management</a>
        </li>
    </ul>
    <router-outlet></router-outlet>
    <router-outlet></router-outlet>
    `
})

export class DashboardComponent {
    title = 'ERP Dashboard';
}