import { Injectable } from "@angular/core";

import { MaterialOrder } from '../shared/material/material-order';

import { Http, Response,Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ProcurementService {
    
    constructor (private http: Http) {}

    MaterialOrderList: MaterialOrder[];
    dataReady = false;
    private get_procurement_web_api = 'app/procurementOrders';  // URL to web API

    private extractMaterialOrderListData(res: Response) {
             let body = res.json();
             console.log(body);
             return body.materialOrderInfoList || { };
    }

    getMaterialOrders(): Observable<MaterialOrder[]> {
      return this.http.get(this.get_procurement_web_api)
                      .map(this.extractMaterialOrderListData)
                      .catch(this.handleError);
    }

    // setMaterialOrders(po: MaterialOrder[]) : void {
    //   console.log("set!");
    //   this.MaterialOrderList = po;
    //   this.dataReady = true;
    //   console.log(this.MaterialOrderList);
    // }

    //根据产品订单号获取相关联的采购订单
    // getMaterialOrder(orderId: number) : MaterialOrder[]{
    //     let order: MaterialOrder[] = [];

    //     if (this.dataReady)
    //     {
    //         //已经从后台获取到全部采购订单，直接从前台生成所需数据
    //         this.MaterialOrderList.forEach(MaterialOrder => {
    //             if (MaterialOrder.orderId == orderId) {
    //                 order.push(MaterialOrder);
    //             }
    //         })
    //     }
    //     else {
    //         //从后台获取
    //     }

    //     return order;
    // }

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