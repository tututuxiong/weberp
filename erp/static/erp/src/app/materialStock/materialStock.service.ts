import { Injectable } from "@angular/core";
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MaterialStock } from './materialStock'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MaterialStockService {
    constructor(private http: Http) {}
    
    private materialsStock = 'app/materialStocks';  // URL to web api


    private extractMaterialsStockInfoData(res: Response) {
        let body = res.json();
        return body.materialStockInfoList || {};
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

    getMaterialStocks(): Observable<MaterialStock[]> {
        return this.http.get(this.materialsStock)
            .map(this.extractMaterialsStockInfoData)
            .catch(this.handleError);
    }
}