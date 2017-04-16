
import { Component } from "@angular/core";
import { OnInit, Input } from "@angular/core";

import { TreeService } from './../shared/tree/tree.service';
import { MaterialStock, MaterialUpdateInfo } from './materialStock';
import { Leaf, Node } from './../shared/tree/tree';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { MaterialOrderService } from '../shared/material/material-order.service';
import { MaterialStockService } from './materialStock.service';
import { MaterialOrder } from '../shared/material/material-order';

@Component({
    selector: 'ngbd-modal-content',
    moduleId: module.id,
    templateUrl: "./templates/materialStock.updatenode.html",
})
export class NgbdModalUpdateNodeContent implements OnInit {
    @Input() name: string;
    root_node: Node;
    choose_leaf: Leaf;
    materialOrderList: MaterialOrder[];
    errorMessage: string;
    materialUpdateInfo: MaterialUpdateInfo;
    orderId: number;

    constructor(
        public activeModal: NgbActiveModal,
        private materialOrderService: MaterialOrderService,
        private materialStockService: MaterialStockService,
        private treeService: TreeService) { }

    ngOnInit(): void {
        this.materialUpdateInfo = new MaterialUpdateInfo();
        this.materialOrderService.getProcurementOrders().subscribe(
            orders => { this.materialOrderList = this.copyMaterialOrders(orders) },
            error => this.errorMessage = <any>error)
        console.log(this.root_node);
    }

    onChooseLeaf(leaf: Leaf) {
        console.log(leaf)
        this.choose_leaf = leaf;
    }

    onChangematerialOrder(order: MaterialOrder) {
        console.log(order);
        this.root_node = null;
        this.orderId = order.id;
        this.treeService.getProcurementOrderMaterialTree(order.id).
            subscribe(materialTree => this.root_node = materialTree,
            error => this.errorMessage = <any>error);
    }

    copyMaterialOrders(src: MaterialOrder[]): MaterialOrder[] {
        let dest: MaterialOrder[] = [];

        src.forEach(materialOrder => {
            dest.push(materialOrder);
        });

        return dest;
    }
    onSubmit() {
        if (this.materialUpdateInfo.num != 0) {
            this.materialUpdateInfo.materialId = this.choose_leaf.id;
            this.materialUpdateInfo.procurementOrderId = this.orderId;
            this.materialUpdateInfo.typeId = 0;
            this.materialStockService.updateMaterialStock(this.materialUpdateInfo).
                subscribe(materialUpdateInfoResult => console.log(materialUpdateInfoResult));
        }
    }
}

