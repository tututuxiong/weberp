import { Injectable } from "@angular/core";

import { Product } from './product';
//import { PRODUCTS } from './mock-products';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
    private productsUrl = 'app/subProducts';  // URL to web API
    constructor (private http: Http) {}

    private extractsubProductInfoData(res: Response) {
             let body = res.json();
             return body;
    }


    private extractsubProductInfoListData(res: Response) {
             let body = res.json();
             return body.subProductInfoList || { };
    }


    getProducts(): Observable<Product[]> {
      return this.http.get(this.productsUrl)
                      .map(this.extractsubProductInfoListData)
                      .catch(this.handleError);
    }

    getProduct(id: number): Observable<Product> {
      const url = `${this.productsUrl}/${id}`;

      return this.http.get(this.productsUrl)
                      .map(this.extractsubProductInfoData)
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
