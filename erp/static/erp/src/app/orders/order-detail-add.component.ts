import { Component } from '@angular/core';

import { Order} from './order';
import { OrderService } from "./order.service";
import { Product } from './products/product';
import { ProductService } from './products/product.service';

import { MaterialOrder } from '../shared/material/material-order';
import { MaterialOrderService } from '../shared/material/material-order.service';

import { Router } from "@angular/router";

@Component({
    moduleId: module.id,
    templateUrl: './templates/order-detail-add.component.html'
})

export class OrderDetailAddComponent {
    new_order: Order = new Order();

    constructor(private os: OrderService,
                private router: Router){}

    onConfirm() : void {
        this.os.addOrder(this.new_order).subscribe(res => {
            if (res.id != -1) {
                this.new_order.id = res.id;
                this.new_order.date = res.date;

                this.router.navigate(['/order', this.new_order.id]);
            }
        })
    }
}