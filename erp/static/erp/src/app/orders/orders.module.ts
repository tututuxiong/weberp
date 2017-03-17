import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule }    from '@angular/http';

import { OrdersComponent } from "./orders.component";
import { OrderDetailComponent } from "./order-detail.component";
import { ProductsComponent } from './products/products.component';
import { ProductsEditableComponent } from './products/products-editable.component';

import { OrderService } from "./order.service";
import { ProductService } from "./products/product.service";

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
        InMemoryWebApiModule.forRoot(InMemoryDataService),
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