import { Injectable } from "@angular/core";

import { Order } from "./order";
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class OrderService {
//    private ordersUrl = 'api/Orders';  // URL to web api
    private ordersUrl = 'app/Orders';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

    private extractOrderListInfoData(res: Response) {
             let body = res.json();
             return body.orderInfoList || { };
    }

    private extractOrderInfoData(res: Response) {
             let body = res.json();
             return body;
    }


    getOrders() : Observable<Order[]> {
        return this.http.get(this.ordersUrl)
                        .map(this.extractOrderListInfoData)
                        .catch(this.handleError);
    }

    getOrder(id: number | string) : Observable<Order> {
        const url = `${this.ordersUrl}/${id}`;

        return this.http.get(url)
                        .map(this.extractOrderInfoData)
                        .catch(this.handleError);
    };
}
