import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { OnInit } from "@angular/core";

import { Order } from './order';
import { OrderService } from './order.service';


// Component definition
@Component({
    //selector is not needed here because we use routing.
    //selector: "my-orders",
    moduleId: module.id,
    templateUrl: "./templates/orders.component.html",
    styleUrls: ["./styles/orders.component.css"]
})

export class OrdersComponent implements OnInit {
    constructor(
        private router: Router,
        private orderservice: OrderService
    ) {}

    ngOnInit() : void {
        this.getOrders();
    }

    // title = '所有订单';
    orderList: Order[];
    selected_order: Order;
    errorMessage: string;

    onSelect(order: Order): void {
        this.selected_order = order;
        this.router.navigate(['/order', order.id]);
    }

    onAdd(): void {
        this.router.navigate(['/order_add']);
    }
/*
    getOrders(): void {
        this.orderservice.getOrders().then(orders => this.orderList = orders);
    }
*/

    getOrders(): void {

        this.orderList = [];    // orderList must be initialized to empty list

        this.orderservice.getOrders()
                         .subscribe(
                           orders => {orders.forEach(order => {
                               let tmpOrder = new Order();
                               tmpOrder.deserialize(order);
                               this.orderList.push(tmpOrder);
                           })
                           },
                           error => this.errorMessage = <any>error);
    }
}
