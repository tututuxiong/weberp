import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { OrdersComponent } from "./orders.component";
import { OrderDetailComponent } from "./order-detail.component";

const ordersRoutes: Routes = [
    {path: 'orders', component: OrdersComponent},
    {path: 'order/:id', component: OrderDetailComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(ordersRoutes) //use forChild instead of forRoot
    ],

    exports: [
        RouterModule
    ]
})

export class OrderRoutingModule {}