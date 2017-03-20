import { Injectable } from "@angular/core";

import { Order } from "./order";
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrderService {
    private ordersUrl = 'api/Orders';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
    getOrders() : Promise<Order[]> {
        return this.http.get(this.ordersUrl)
               .toPromise()
               .then(response => response.json().data as Order[])
               .catch(this.handleError);
    }

    getOrder(id: number | string) : Promise<Order> {
        const url = `${this.ordersUrl}/${id}`;

        return this.http.get(url)
               .toPromise()
               .then(response => response.json().data as Order)
               .catch(this.handleError);
    };

    delete(id: number): Promise<void> {
        const url = `${this.ordersUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    } ;

    update(order: Order): Promise<Order> {
      const url = `${this.ordersUrl}/${order.id}`;
      return this.http
            .put(url, JSON.stringify(order), {headers: this.headers})
            .toPromise()
            .then(() => order)
            .catch(this.handleError);
    };
}
