import { Component } from "@angular/core";
import { OnInit } from "@angular/core";

// import { ProcurementService } from './procurement.service';

import { MaterialOrderService } from '../shared/material/material-order.service';

// Import from SharedModule
import { MaterialOrder } from '../shared/material/material-order';

@Component({
    moduleId: module.id,
    templateUrl: './templates/procurement.html'
})

export class ProcurementComponent implements OnInit {

    constructor(private materialOrderService: MaterialOrderService){

    }

    materialOrderList: MaterialOrder[];  //全部采购订单
    errorMessage: string;

    ngOnInit() {
        this.getProcurementOrders();
    }

    //获取全部采购订单
    getProcurementOrders() : void {
        this.materialOrderService.getProcurementOrders().subscribe(
            orders => {this.materialOrderList = this.copyMaterialOrders(orders);
                console.log("orders: ", orders);
                console.log("materialOrderList: ", this.materialOrderList);
                // this.procurementService.setMaterialOrders(this.materialOrderList);
            },
            error => this.errorMessage = <any>error
        )
    }

    copyMaterialOrders(src: MaterialOrder[]) : MaterialOrder[] {
        let dest: MaterialOrder[] = [];

        src.forEach(materialOrder => {
            dest.push(materialOrder);
        });

        return dest;
    }
}