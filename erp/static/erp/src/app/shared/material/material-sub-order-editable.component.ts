import { Component } from "@angular/core";
import { Input, OnInit } from "@angular/core";

import { MaterialSubOrder, VendorInfo } from './material-sub-order';

import { Leaf, Node } from '../tree/tree';
import { TreeService } from '../tree/tree.service';
import { NgbdModalChooseNodeContent, NgbdModalChooseNodeContent_Output } from './../../stock/stock.choose.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MaterialOrderService } from './material-order.service';

@Component({
    selector: 'material-sub-order-editable',
    moduleId: module.id,
    templateUrl: 'static/erp/src/app/shared/material/templates/material-sub-order-editable.html'
})

export class MaterialSubOrderEditableComponent implements OnInit {
    @Input()
    materialSubOrderList: MaterialSubOrder[];

    @Input()
    materialOrderId: number;

    vendorList: VendorInfo[][];

    material_root_node: Node;
    constructor(private ts: TreeService,
        private moService: MaterialOrderService, 
        private modalService: NgbModal, ) {

    }

    ngOnInit() {
        this.vendorList = [];
        this.material_root_node = this.ts.getMaterialRootTreeInMemory();

        this.materialSubOrderList.forEach(material => {
            let index = this.materialSubOrderList.indexOf(material);
            this.getVendorInfo(material.materialId, index);
        });
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
        this.getVendorInfo(newMaterial.materialId, this.materialSubOrderList.length-1);
    }

    private getVendorInfo(materialId: number, index: number): void {
        this.moService.getVendorListbyStockId(materialId).subscribe(
            vendorinfoList=>{
                this.vendorList[index] = [];
                vendorinfoList.forEach(vendorInfo => {
                          let vendor = new VendorInfo();
                          vendor.deserialize(vendorInfo);
                          this.vendorList[index].push(vendor);

                          if(vendor.id == this.materialSubOrderList[index].vendor.id){
                                this.materialSubOrderList[index].vendor = vendor;
                          }
            })
        }
        );
    }

    onDeleteMaterial(material: MaterialSubOrder): void {
        let index = this.materialSubOrderList.indexOf(material);
        this.vendorList.splice(index,1);
        this.materialSubOrderList.splice(index, 1);
    }
}