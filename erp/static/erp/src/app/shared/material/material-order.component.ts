import { Component } from "@angular/core";
import { Input, OnInit } from "@angular/core";

import { MaterialOrder } from './material-order';
import { MaterialSubOrder } from './material-sub-order';
import { MaterialOrderService } from './material-order.service';

import { Leaf, Node } from '../tree/tree';
import { TreeService } from '../tree/tree.service';

@Component({
    selector: 'material-order',
    moduleId: module.id,
    templateUrl: './templates/material-order.html'
})

export class MaterialOrderComponent implements OnInit {
    @Input()
    materialOrderList: MaterialOrder[];

    moBackup: MaterialOrder;

    constructor (private moService: MaterialOrderService,
                 private mtService: TreeService) {

    }

    ngOnInit() {

    }

    copyMaterialOrder(dst: MaterialOrder, src: MaterialOrder) : void {
        
        let subOrderList: MaterialSubOrder[] = [];
        
        dst.comment = src.comment;
        dst.date = src.date;
        dst.id = src.id;
        dst.name = src.name;
        dst.orderId = src.orderId;
        dst.price = src.price;
        dst.status = src.status;
        dst.subOrderCount = src.subOrderCount;

        src.materialSubOrderInfoList.forEach(subOrder => {
            let tempSubOrder: MaterialSubOrder = new MaterialSubOrder(0);
            tempSubOrder.copy(subOrder);
            subOrderList.push(tempSubOrder);
        })

        dst.materialSubOrderInfoList = subOrderList;

    }

    onModify(materialOrder: MaterialOrder) : void {
        materialOrder.modifyMode = true;

        // Back up materialOrder
        this.moBackup = new MaterialOrder(0);
        this.copyMaterialOrder(this.moBackup, materialOrder);
    }

    onSubmit(materialOrder: MaterialOrder) : void {

        function match_id(mo: MaterialOrder) {
            return mo.id == this;
        }

        this.moService.updateMaterialOrder(materialOrder).subscribe(mo => {
            // this.moService.objectCopy(materialOrder, mo);
            materialOrder.deserialize(mo);
            materialOrder.modifyMode = false;
        })
    }

    onAbort(materialOrder: MaterialOrder) : void {
        // Restore materialOrder
        this.copyMaterialOrder(materialOrder, this.moBackup);

        materialOrder.modifyMode = false;
    }

    onDelete(materialOrder: MaterialOrder) : void {
        this.moService.delMaterialOrder(materialOrder).subscribe(mo => {
            this.materialOrderList.splice(this.materialOrderList.indexOf(materialOrder), 1);
        })
    }
}