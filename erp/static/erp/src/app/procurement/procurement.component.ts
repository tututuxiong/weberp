import { Component } from "@angular/core";
import { OnInit } from "@angular/core";

import { ProcurementOrderService } from './procurement-order.service';

// Import from SharedModule
import { MaterialOrder } from '../shared/material/material-order';

@Component({
    moduleId: module.id,
    templateUrl: './templates/procurement.html'
})

export class ProcurementComponent implements OnInit {

    constructor(private procurementService: ProcurementOrderService){

    }

    materialOrderList: MaterialOrder[];  //全部采购订单
    errorMessage: string;

    ngOnInit() {
        this.getProcurementOrders();
    }

    //获取全部采购订单
    getProcurementOrders() : void {
        this.procurementService.getMaterialOrders().subscribe(
            orders => {this.materialOrderList = orders; 
                // this.initialized = true; 
                this.procurementService.setMaterialOrders(this.materialOrderList);},
            error => this.errorMessage = <any>error
        )
    }


}