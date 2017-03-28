import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule, JsonpModule }    from '@angular/http';

import { OrdersComponent } from "./orders.component";
import { OrderDetailComponent } from "./order-detail.component";
import { ProductsComponent } from './products/products.component';
import { ProductsEditableComponent } from './products/products-editable.component';

// import { MaterialOrderComponent } from './material-order/material-order.component';
// import { MaterialSubOrderComponent } from './material-order/material-sub-order.component';
// import { MaterialSubOrderEditableComponent } from './material-order/material-sub-order-editable.component';

import { OrderService } from "./order.service";
import { ProductService } from "./products/product.service";
import { MaterialOrderService } from "./material-order.service";

import { OrderRoutingModule } from "./orders-routing.module";
// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './in-memory-data.service';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { ProcurementOrderService } from '../procurement/procurement-order.service';

 import { SharedModule } from '../shared/shared.module'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        NgbModule,
        SharedModule,
        OrderRoutingModule,
    ],

    declarations: [
        OrdersComponent,
        OrderDetailComponent,
        ProductsComponent,
        ProductsEditableComponent,
    ],
    providers: [
        OrderService,
        ProductService,
        MaterialOrderService,
        ProcurementOrderService
    ]

})

export class OrdersModule {}
