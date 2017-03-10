import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { OrdersComponent } from "./orders.component";
import { OrderDetailComponent } from "./order-detail.component";

import { OrderService } from "./order.service";

import { OrderRoutingModule } from "./orders-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OrderRoutingModule
    ],

    declarations: [
        OrdersComponent,
        OrderDetailComponent
    ],
    providers: [
        OrderService
    ]

})

export class OrdersModule {}