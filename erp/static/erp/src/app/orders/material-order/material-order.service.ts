import { Injectable } from "@angular/core";

import { MaterialOrder } from './material-order';

import { Http, Response,Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MaterialOrderService {
    private productsUrl_part1 = 'app/orders';  // URL to web API
    private productsUrl_part2 = 'material-orders';  // URL to web API

    constructor (private http: Http) {}

    // private extractMaterialOrderInfoData(res: Response) {
    //          let body = res.json();
    //          return body;
    // }


    private extractMaterialOrderInfoListData(res: Response) {
             let body = res.json();
             return body.subProductInfoList || { };
    }

    // private extractDelMaterialOrderInfoListData(res: Response) {
    //          let body = res.json();
    //          return body;
    // }

    getMaterialOrders(id: number): Observable<MaterialOrder[]> {
      const url = `${this.productsUrl_part1}/${id}/${this.productsUrl_part2}`;
      return this.http.get(url)
                      .map(this.extractMaterialOrderInfoListData)
                      .catch(this.handleError);
    }

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
}