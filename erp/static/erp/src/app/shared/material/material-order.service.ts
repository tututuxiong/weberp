import { Injectable } from "@angular/core";

import { MaterialOrder } from './material-order';

import { Http, Response,Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MaterialOrderService {
    private materialOrdersUrl_part1 = 'app/orders';  // URL to web API
    private materialOrdersUrl_part2 = 'procurementOrders';  // URL to web API

    private procurementOrdersUrl = 'app/procurementOrders';

    private createMaterialOrderUrl = 'app/procurementOrder';

    constructor (private http: Http) {}

    // private extractMaterialOrderData(res: Response) {
    //          let body = res.json();
    //          return body;
    // }


    private extractMaterialOrderListData(res: Response) {
             let body = res.json();
             return body.materialOrderInfoList || { };
    }

    private extractMaterialOrderData(res: Response) {
             let body = res.json();
             return body;
    }

    
    private extractDelMaterialOrderData(res: Response) {
             let body = res.json();
             return body;
    }
    // private extractDelMaterialOrderListData(res: Response) {
    //          let body = res.json();
    //          return body;
    // }

    getMaterialOrders(id: number): Observable<MaterialOrder[]> {
      const url = `${this.materialOrdersUrl_part1}/${id}/${this.materialOrdersUrl_part2}`;
      return this.http.get(url)
                      .map(this.extractMaterialOrderListData)
                      .catch(this.handleError);
    }

    getProcurementOrders(): Observable<MaterialOrder[]> {
      return this.http.get(this.procurementOrdersUrl)
                      .map(this.extractMaterialOrderListData)
                      .catch(this.handleError);
    }

    // getMaterialOrder(id: number): Observable<MaterialOrder> {
    //   const url = `${this.materialOrder}/${id}`;

    //   return this.http.get(url)
    //                   .map(this.extractMaterialOrderData)
    //                   .catch(this.handleError);
    // }

    
    //  updateMaterialOrder(materialOrder: MaterialOrder): Observable<MaterialOrder>{
    //   let headers = new Headers({ 'Content-Type': 'application/json' });
    //   let options = new RequestOptions({ headers: headers });
    //   const url = `${this.materialOrder}/${materialOrder.id}`;
    //   return  this.http.post(url, { materialOrder }, options)
    //                    .map(this.extractMaterialOrderData)
    //                    .catch(this.handleError);
    // }

     addMaterialOrder(materialOrder: MaterialOrder): Observable<MaterialOrder>{
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      const url = `${this.createMaterialOrderUrl}/0`;
      return  this.http.put(url, { materialOrder }, options)
                       .map(this.extractMaterialOrderData)
                       .catch(this.handleError);
    }    

    //  delProducts(materialOrder: MaterialOrder): Observable<MaterialOrder>{
    //   let headers = new Headers({ 'Content-Type': 'application/json' });
    //   let options = new RequestOptions({ headers: headers });
    //   const url = `${this.materialOrder}/${materialOrder.id}`;
    //   return  this.http.delete(url, options)
    //                    .map(this.extractDelMaterialOrderData)
    //                    .catch(this.handleError);                   
    //  }

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