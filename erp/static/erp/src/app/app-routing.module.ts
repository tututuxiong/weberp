import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {DashboardComponent} from "./dashboard/dashboard.component";
import {OrdersComponent} from "./orders/orders.component";
import {ProcurementComponent} from "./procurement/procurement.component";
import {InventoryComponent} from "./inventory/inventory.component";
import {LoginComponent} from "./core/admin/login.component";

import { AuthGuard } from "./core/admin/auth-guard.service";

const appRoutes : Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }, {
        path: 'inventory',
        component: InventoryComponent,
        canActivate: [AuthGuard]
    }, 
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}