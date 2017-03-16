import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { OrdersComponent } from "./orders.component";
import { OrderDetailComponent } from "./order-detail.component";
import { ProductsComponent } from './products/products.component';
import { ProductsEditableComponent } from './products/products-editable.component';

import { OrderService } from "./order.service";
import { ProductService } from "./products/product.service";

import { OrderRoutingModule } from "./orders-routing.module";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OrderRoutingModule,
    ],

    declarations: [
        OrdersComponent,
        OrderDetailComponent,
        ProductsComponent,
        ProductsEditableComponent
    ],
    providers: [
        OrderService,
        ProductService
    ]

})

export class OrdersModule {}