import { Component } from "@angular/core";
import { Input } from "@angular/core";

// import { OnInit } from '@angular/core';

import { MaterialOrder } from './material-order';

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

    onModify(materialOrder: MaterialOrder) : void {
        materialOrder.modifyMode = true;
    }

    onSubmit(materialOrder: MaterialOrder) : void {
        materialOrder.modifyMode = false;
    }

    onAbort(materialOrder: MaterialOrder) : void {
        materialOrder.modifyMode = false;
    }
}