import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { OrdersComponent } from "./orders.component";
import { OrderDetailComponent } from "./order-detail.component";
import { OrderDetailAddComponent } from "./order-detail-add.component";

const ordersRoutes: Routes = [
    {path: 'orders', component: OrdersComponent},
    {path: 'order/:id', component: OrderDetailComponent},
    {path: 'order_add', component: OrderDetailAddComponent}
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