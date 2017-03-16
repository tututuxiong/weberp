import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { OrdersComponent } from "./orders.component";
import { OrderDetailComponent } from "./order-detail.component";

import { OrderService } from "./order.service";
import { ProductService } from "./product.service";

import { OrderRoutingModule } from "./orders-routing.module";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

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
        OrderService,
        ProductService
    ]

})

export class OrdersModule {}