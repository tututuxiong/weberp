import { Component } from "@angular/core";
import { Input, OnInit } from "@angular/core";

import { MaterialOrder } from './material-order';
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

    constructor (private moService: MaterialOrderService,
                 private mtService: TreeService) {

    }

    ngOnInit() {

    }

    onModify(materialOrder: MaterialOrder) : void {
        materialOrder.modifyMode = true;
    }

    onSubmit(materialOrder: MaterialOrder) : void {

        function match_id(mo: MaterialOrder) {
            return mo.id == this;
        }

        this.moService.updateMaterialOrder(materialOrder).subscribe(mo => {
            this.moService.objectCopy(materialOrder, mo);
            materialOrder.modifyMode = false;
        })
    }

    onAbort(materialOrder: MaterialOrder) : void {
        materialOrder.modifyMode = false;
    }

    onDelete(materialOrder: MaterialOrder) : void {
        this.moService.delMaterialOrder(materialOrder).subscribe(mo => {
            this.materialOrderList.splice(this.materialOrderList.indexOf(materialOrder), 1);
        })
    }
}