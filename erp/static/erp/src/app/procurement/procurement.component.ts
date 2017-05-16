import { Component } from "@angular/core";
import { OnInit } from "@angular/core";

// import { ProcurementService } from './procurement.service';

import { MaterialOrderService } from '../shared/material/material-order.service';

// Import from SharedModule
import { MaterialOrder } from '../shared/material/material-order';
import { TreeService } from '../shared/tree/tree.service';

@Component({
    moduleId: module.id,
    templateUrl: 'static/erp/src/app/procurement/templates/procurement.html'
})

export class ProcurementComponent implements OnInit {

    materialOrderList: MaterialOrder[];  //全部采购订单
    errorMessage: string;
    serviceReady: Boolean;

    constructor(private materialOrderService: MaterialOrderService,
                private ts: TreeService)
    {
        this.materialOrderList = [];
        this.errorMessage = '';
        this.serviceReady = false;
    }

    ngOnInit() {

        if(!this.ts.readyForServe()) {

            let that = this;

            this.ts.regCallBack(function() {
                that.serviceReady = true;
            });
        }
        else {
            this.serviceReady = true;
        }

        this.getProcurementOrders();
    }

    //获取全部采购订单
    getProcurementOrders() : void {
        this.materialOrderService.getProcurementOrders().subscribe(
            moList => {
                moList.forEach(mo => {
                    let tmpMO = new MaterialOrder(0);

                    tmpMO.deserialize(mo);
                    this.materialOrderList.push(tmpMO);
                })
            },
            error => this.errorMessage = <any>error
        )
    }
}