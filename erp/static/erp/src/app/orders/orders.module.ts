import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule, JsonpModule }    from '@angular/http';

import { OrdersComponent } from "./orders.component";
import { OrderDetailComponent } from "./order-detail.component";
import { OrderDetailAddComponent } from "./order-detail-add.component";
import { ProductsComponent } from './products/products.component';
import { ProductsEditableComponent } from './products/products-editable.component';

import { OrderService } from "./order.service";
import { ProductService } from "./products/product.service";
import { MaterialOrderService } from "../shared/material/material-order.service";

import { DetailMaterialComponent } from "./detail-material/detail-material.component"
import { MaterialStockService } from './../materialStock/materialStock.service';

import { OrderRoutingModule } from "./orders-routing.module";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

// import { ProcurementOrderService } from '../procurement/procurement-order.service';

 import { SharedModule } from '../shared/shared.module';
 import { TreeModule } from '../shared/tree/tree.module'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        NgbModule,
        SharedModule,
        OrderRoutingModule,
        TreeModule,
    ],

    declarations: [
        OrdersComponent,
        OrderDetailComponent,
        OrderDetailAddComponent,
        ProductsComponent,
        DetailMaterialComponent,
        ProductsEditableComponent,
    ],
    providers: [
        OrderService,
        ProductService,
        MaterialOrderService,
        MaterialStockService,
    ]

})

export class OrdersModule {}
