import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Stock, StockUpdateInfo } from './Stock'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class StockService {
    constructor(private http: Http) {}
    
    private materialsStockUrl = 'app/materialStocks';  // URL to web api
    private productsStockUrl = 'app/productStocks';  // URL to web api  

    private extractMaterialsStockInfoData(res: Response) {
        let body = res.json();
        return body.materialStockInfoList || {};
    }

    private extractMaterialsStockUpdateInfo(res: Response) {
        let body = res.json();
        return body || {};
    }

    private extractStockInfoData(res: Response) {
        let body = res.json();
        return body;
    }

    private handleError(error: Response | any) {
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

    getMaterialStocks(): Observable<Stock[]> {
        return this.http.get(this.materialsStockUrl)
            .map(this.extractStockInfoData)
            .catch(this.handleError);
    }

    getProductStocks(): Observable<Stock[]> {
        return this.http.get(this.productsStockUrl)
            .map(this.extractStockInfoData)
            .catch(this.handleError);
    }    

    updateMaterialStock(materialUpdateInfo:StockUpdateInfo): Observable<StockUpdateInfo[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const url = `${this.materialsStockUrl}/${materialUpdateInfo.stockId}`;
        return  this.http.post(url, { materialUpdateInfo }, options)
                       .map(this.extractMaterialsStockUpdateInfo)
                       .catch(this.handleError);
    }    

    getMaterialStockById(id: number): Observable<Stock> {
        const url = `${this.materialsStockUrl}/${id}`;
        return this.http.get(url)
            .map(this.extractStockInfoData)
            .catch(this.handleError);
    }
}