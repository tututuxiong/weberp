import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule, JsonpModule }    from '@angular/http';

import { OrdersComponent } from "./orders.component";
import { OrderDetailComponent } from "./order-detail.component";
import { ProductsComponent } from './products/products.component';
import { ProductsEditableComponent } from './products/products-editable.component';
import { DetailMaterialComponent } from "./detail-material/detail-material.component"
import { MaterialOrderComponent } from './material-order/material-order.component';

import { OrderService } from "./order.service";
import { ProductService } from "./products/product.service";
import { MaterialOrderService } from "./material-order/material-order.service";
import { MaterialStockService } from './../materialStock/materialStock.service';

import { OrderRoutingModule } from "./orders-routing.module";
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        NgbModule,
        //InMemoryWebApiModule.forRoot(InMemoryDataService),
        OrderRoutingModule,
    ],

    declarations: [
        OrdersComponent,
        OrderDetailComponent,
        ProductsComponent,
        DetailMaterialComponent,
        ProductsEditableComponent,
        MaterialOrderComponent
    ],
    providers: [
        OrderService,
        ProductService,
        MaterialOrderService,
        MaterialStockService,
    ]

})

export class OrdersModule {}
