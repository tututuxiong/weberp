import { Component } from "@angular/core";
import { Input, OnInit } from "@angular/core";

import { MaterialSubOrder } from './material-sub-order';

import { Leaf, Node } from '../tree/tree';
import { TreeService } from '../tree/tree.service';

@Component({
    selector: 'material-sub-order-editable',
    moduleId: module.id,
    templateUrl: './templates/material-sub-order-editable.html'
})

export class MaterialSubOrderEditableComponent implements OnInit {
    @Input()
    materialSubOrderList: MaterialSubOrder[];

    @Input()
    materialOrderId: number;

    newMaterial: MaterialSubOrder;

    material_level1: Node[];
    material_level2: Leaf[];

    material_level1_name: string[];

    selected_material: Leaf;

    constructor (private ts: TreeService) {

    }

    ngOnInit () {

        this.material_level1_name = [];

        this.selected_material = undefined;

        this.materialSubOrderList.forEach(mso => {
            let level1 = this.ts.getParentByLeafId(mso.materialId, undefined);
            this.material_level1_name.push(level1.name);
        });

        this.material_level1_name.forEach(level1_name => {
         })

        this.newMaterial = new MaterialSubOrder(this.materialOrderId);
        this.material_level1 = [];

        this.ts.getChildrenNodes(undefined).forEach(node => {
            this.material_level1.push(node);
        })
    }
    
    onAddMaterial() {

        this.newMaterial.materialId = this.selected_material.id;
        this.newMaterial.name = this.selected_material.name;

        this.materialSubOrderList.push(this.newMaterial);
        this.newMaterial = new MaterialSubOrder(this.materialOrderId);
    }

    onDeleteMaterial(material: MaterialSubOrder) : void {
        let index = this.materialSubOrderList.indexOf(material);
        this.materialSubOrderList.splice(index, 1);
    }

    onChangeLevel1(level1: Node) {
        this.material_level2 = [];

        this.ts.getChildrenLeafs(level1).forEach(leaf => {
            this.material_level2.push(leaf);
        })
    }

    onChangeLevel2(level2: Leaf) {
        this.selected_material = level2;
    }
}