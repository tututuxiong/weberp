import { Injectable } from "@angular/core";

import { Order } from "./order";
import { ORDERLIST } from "./mock-orders"

@Injectable()
export class OrderService {
    getOrders() : Promise<Order[]> {
        return Promise.resolve(ORDERLIST);
    }

    getOrder(id: number | string) : Promise<Order> {
        return this.getOrders().then(orders => orders.find(order => order.id === + id));
    }
}