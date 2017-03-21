import { Injectable } from "@angular/core";

import { Product } from './product';
//import { PRODUCTS } from './mock-products';

import { Http, Response,Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
    private productsUrl_part1 = 'app/orders';  // URL to web API
    private productsUrl_part2 = 'subProducts';  // URL to web API

    constructor (private http: Http) {}

    private extractsubProductInfoData(res: Response) {
             let body = res.json();
             return body;
    }


    private extractsubProductInfoListData(res: Response) {
             let body = res.json();
             return body.subProductInfoList || { };
    }

    private extractDelSubProductInfoListData(res: Response) {
             let body = res.json();
             return body;
    }

    getProducts(id: number): Observable<Product[]> {
      const url = `${this.productsUrl_part1}/${id}/${this.productsUrl_part2}`;
      return this.http.get(url)
                      .map(this.extractsubProductInfoListData)
                      .catch(this.handleError);
    }

    getProduct(orderId: number, id: number): Observable<Product> {
      const url = `${this.productsUrl_part1}/${orderId}/${this.productsUrl_part2}/${id}`;

      return this.http.get(url)
                      .map(this.extractsubProductInfoData)
                      .catch(this.handleError);
 
    }

    updateProducts(product: Product): Observable<Product>{
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      const url = `${this.productsUrl_part1}/${product.orderId}/${this.productsUrl_part2}/${product.id}`;
      var product = product;
      return  this.http.post(url, { product }, options)
                       .map(this.extractsubProductInfoData)
                       .catch(this.handleError);
    }
    
    delProducts(product: Product): Observable<Product>{
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      const url = `${this.productsUrl_part1}/${product.orderId}/${this.productsUrl_part2}/${product.id}`;
      var product = product;
      return  this.http.delete(url, options)
                       .map(this.extractDelSubProductInfoListData)
                       .catch(this.handleError);
    }

    addProducts(product: Product): Observable<Product>{
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      const url = `${this.productsUrl_part1}/${product.orderId}/${this.productsUrl_part2}/${product.id}`;
      var product = product;
      return  this.http.put(url, { product }, options)
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
