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

    material_root_node: Node;
    constructor(private ts: TreeService) {

    }

    ngOnInit() {
        this.material_root_node = this.ts.getMaterialRootTreeInMemory();
    }

    getParentPathInfo(material: any): string {
        let leaf = new Leaf();
        leaf.id = material.materialId;
        return this.ts.getParentPathInfo(this.material_root_node, leaf);
    }
}