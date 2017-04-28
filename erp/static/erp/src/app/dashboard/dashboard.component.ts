import { Component } from "@angular/core";
import { OnInit } from "@angular/core";

import { TreeService } from '../shared/tree/tree.service';

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

export class DashboardComponent implements OnInit {
    private title: string = 'ERP Dashboard';

    private serviceReady: Boolean = false;

    constructor(private ts: TreeService){

    }

    ngOnInit() : void {
        this.ts.subscribe().then(res => {
            this.serviceReady = true;
        })
    }
}