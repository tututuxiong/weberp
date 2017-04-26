import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule, JsonpModule }    from '@angular/http';

/* Components */
import { OrdersComponent } from "./orders.component";
import { OrderDetailComponent } from "./order-detail.component";
import { OrderDetailAddComponent } from "./order-detail-add.component";
import { ProductsComponent } from './products/products.component';
import { ProductsEditableComponent } from './products/products-editable.component';
import { DetailMaterialComponent } from "./detail-material/detail-material.component";

/* Services */
import { OrderService } from "./order.service";
import { ProductService } from "./products/product.service";
import { StockService } from './../stock/stock.service';

/* Routing */
import { OrderRoutingModule } from "./orders-routing.module";

/* External */
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
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
        StockService,
    ]
})

export class OrdersModule {}
