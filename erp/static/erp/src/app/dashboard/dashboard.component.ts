import { Component } from "@angular/core";

@Component({
    // selector: 'erp-dashboard',
    moduleId: module.id,
    // template: `<h1>{{title}}</h1>
    // <ul>
    //     <li>
    //     <a routerLink="/orders">Order Management</a>
    //     </li>
    //     <li>
    //     <a routerLink="/inventory">Inventory Management</a>
    //     </li>
    // </ul>
    // <router-outlet></router-outlet>
    // <router-outlet></router-outlet>
    // `
    templateUrl: './templates/dashboard.component.html'

})

export class DashboardComponent {
    private title: string = 'ERP Dashboard';
}