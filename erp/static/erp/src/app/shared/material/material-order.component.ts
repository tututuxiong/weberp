import { Component } from "@angular/core";
import { Input } from "@angular/core";

// import { OnInit } from '@angular/core';

import { MaterialOrder } from './material-order';
import { MaterialOrderService } from './material-order.service';

@Component({
    selector: 'material-order',
    moduleId: module.id,
    templateUrl: './templates/material-order.html'
})

export class MaterialOrderComponent {
    @Input()
    materialOrderList: MaterialOrder[];

    // ngOnInit() {
    //     this.materialOrderList.forEach(materialOrder => {
    //         materialOrder.modifyMode = false;
    //     })
    // }

    constructor (private moService: MaterialOrderService) {

    }

    onModify(materialOrder: MaterialOrder) : void {
        materialOrder.modifyMode = true;
    }

    onSubmit(materialOrder: MaterialOrder) : void {

        function match_id(mo: MaterialOrder) {
            return mo.id == this;
        }

        this.moService.updateMaterialOrder(materialOrder).subscribe(mo => {
            // console.log(mo.id);
            // let mo_u : MaterialOrder = this.materialOrderList.find(match_id, mo.id);
            // console.log(mo_u);
            // mo_u.custom_copy(mo);
            // mo_u.modifyMode = false;
            this.moService.objectCopy(materialOrder, mo);
            materialOrder.modifyMode = false;
        })
    }

    onAbort(materialOrder: MaterialOrder) : void {
        materialOrder.modifyMode = false;
    }
}