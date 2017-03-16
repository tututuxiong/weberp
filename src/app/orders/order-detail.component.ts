import { Component, Input } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { Order, OrderStatus } from './order';
import { OrderService } from "./order.service";
import { Product } from './product';
import { ProductService } from './product.service';

import 'rxjs/add/operator/switchMap';

@Component({
    //selector is not needed here because we use routing.
    //selector: 'order-detail',
    moduleId: module.id,
    templateUrl: "./templates/order-detail.component.html"
})

export class OrderDetailComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,  //Inject ActivatedRoute to pull params from routing
        private router: Router,
        private order_service: OrderService,
        private product_service: ProductService
    ) {}

    title: string; //Initialization must be put in ngOnInit; otherwise there is no effect. Don't know why.
    //@Input()
    orderDetail: Order;
    productList: Product[];

    ngOnInit() : void {
        this.route.params
        .switchMap((params: Params) => this.order_service.getOrder(+params['id']))
        .subscribe((order: Order) => this.orderDetail = order);

        this.product_service.getProducts().then(products => this.productList = products);

        this.title = 'Order Detail';    //Initialize title attribute here!!!
    }

}