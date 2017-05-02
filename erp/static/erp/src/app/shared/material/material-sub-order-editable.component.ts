import { Component } from "@angular/core";
import { Input, OnInit } from "@angular/core";

import { MaterialSubOrder } from './material-sub-order';

import { Leaf, Node } from '../tree/tree';
import { TreeService } from '../tree/tree.service';
import { NgbdModalChooseNodeContent, NgbdModalChooseNodeContent_Output } from './../../stock/stock.choose.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

    material_root_node: Node;
    constructor(private ts: TreeService,
        private modalService: NgbModal, ) {

    }

    ngOnInit() {
        this.material_root_node = this.ts.getMaterialRootTreeInMemory();
    }

    getParentPathInfo(material: any): string {
        let leaf = new Leaf();
        leaf.id = material.materialId;
        return this.ts.getParentPathInfo(this.material_root_node, leaf);
    }

    onAddMaterial() {
        const modalRef = this.modalService.open(NgbdModalChooseNodeContent);
        modalRef.componentInstance.root_node = this.material_root_node;

        modalRef.result.then(result => this.handleResult(result));
    }

    private handleResult(result: NgbdModalChooseNodeContent_Output): void {
        let newMaterial = new MaterialSubOrder(this.materialOrderId);
        newMaterial.materialId = result.choosed_leaf.id;
        newMaterial.name = result.choosed_leaf.name;
        newMaterial.unit = result.choosed_leaf.unit;
        newMaterial.num = result.num;
        newMaterial.unit_price = 0;
        this.materialSubOrderList.push(newMaterial);
    }

    onDeleteMaterial(material: MaterialSubOrder): void {
        let index = this.materialSubOrderList.indexOf(material);
        this.materialSubOrderList.splice(index, 1);
    }
}