import { Component } from "@angular/core";
import { OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

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
    templateUrl: 'static/erp/src/app/dashboard/templates/dashboard.component.html'

})

export class DashboardComponent implements OnInit {
    private title: string = 'ERP Dashboard';
    private promotion: boolean;

    constructor(
        private route: ActivatedRoute
    ) {
        this.promotion = false;
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            if (params['auth_res'] == 'false') {
                this.promotion = true;
                console.log("User is not permitted to visit target.");
            }
        });
    }
}