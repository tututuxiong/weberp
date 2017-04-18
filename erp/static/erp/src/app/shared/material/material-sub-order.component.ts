import { Component } from "@angular/core";
import { Input, OnInit } from "@angular/core";

import { MaterialSubOrder } from './material-sub-order';
import { TreeService } from '../tree/tree.service';
import { Leaf, Node } from '../tree/tree';

@Component({
    selector: 'material-sub-order',
    moduleId: module.id,
    templateUrl: './templates/material-sub-order-default.html'
})

export class MaterialSubOrderComponent implements OnInit {
    @Input()
    materialSubOrderList: MaterialSubOrder[];
    
    material_level1_name: string[];

    constructor(private ts: TreeService) {

    }

    ngOnInit() {
        this.material_level1_name = [];

        this.materialSubOrderList.forEach(mso => {
            let level1 = this.ts.getParentByLeafId(mso.materialId, undefined);
            console.log(level1);
            this.material_level1_name.push(level1.name);
        });

        this.material_level1_name.forEach(level1_name => {
            console.log(level1_name);
        })
    }
}