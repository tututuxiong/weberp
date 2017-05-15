import { Component } from "@angular/core";
import { Input } from "@angular/core";
import { OnInit } from "@angular/core";
import { MaterialRequriment, Product } from './../products/product';
import { DetailMaterialRequriment } from './detail-material'
import { StockService } from './../../stock/stock.service';
import { ProductService } from './../products/product.service';
import { TreeService } from './../../shared/tree/tree.service'
import { Node, Leaf } from './../../shared/tree/tree'
import { NgbdModalChooseNodeContent, NgbdModalChooseNodeContent_Output } from './../../stock/stock.choose.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'detail-material',
    moduleId: module.id,
    templateUrl: './templates/detail-material.html'
})

export class DetailMaterialComponent implements OnInit {
    @Input()
    productList: Product[];

    @Input()
    materialItemList: DetailMaterialRequriment[];

    materialItemtEditable: Boolean;
    tmpProductMaterial: MaterialRequriment[];
    errorMessage: string;

    material_root_node: Node;

    constructor(
        private material_stock_service: StockService,
        private product_service: ProductService,
        private tree_service: TreeService,
        private modalService: NgbModal,
    ) {
        this.materialItemtEditable = false;
    }

    ngOnInit(): void {
        this.material_root_node = this.tree_service.getMaterialRootTreeInMemory();
    }

    onSubmitEdit(index: number) {
        if (!this.checkEqual(index)) {
            this.updateDetailmaterialItemInfo();
            // console.log(this.productList[index]);
            this.product_service.updateProducts(this.productList[index])
                .subscribe(prodtct => this.productList[index] = prodtct,
                error => this.errorMessage = <any>error);
        }

        this.materialItemtEditable = !this.materialItemtEditable;
    }

    private checkEqual(index: number): boolean {
        var isSame = true;
        if (this.tmpProductMaterial.length != this.productList[index].materialRequrimentList.length) {
            return false;
        }
        else {
            for (var i = 0; i < this.tmpProductMaterial.length; i++) {
                for (var j = 0; j < this.productList[index].materialRequrimentList.length; j++) {
                    if (this.tmpProductMaterial[i].materialId != this.productList[index].materialRequrimentList[j].materialId
                        || this.tmpProductMaterial[i].count != this.productList[index].materialRequrimentList[j].count) {
                        isSame = false;
                        break;
                    }
                }
                if (isSame != true) {
                    return false;
                }
            }
        }
        return true;
    }

    onEdit(index: number) {
        this.tmpProductMaterial = this.copyMaterialRequrimentArray(this.productList[index].materialRequrimentList);
        this.materialItemtEditable = !this.materialItemtEditable;
        // this.tree_service.getTreeRoot().subscribe(materialTree => this.mateialTree = materialTree)
    }

    onCancelEdit(index: any) {
        this.productList[index].materialRequrimentList = this.copyMaterialRequrimentArray(this.tmpProductMaterial);
        this.materialItemtEditable = !this.materialItemtEditable;
    }

    onDelete(index: number, materialRequrimentListIndex: number) {
        this.productList[index].materialRequrimentList.splice(materialRequrimentListIndex, 1);
    }

    onAdd(index: number) {
        const modalRef = this.modalService.open(NgbdModalChooseNodeContent);
        modalRef.componentInstance.root_node = this.material_root_node;

        modalRef.result.then(result => this.handleResult(result,index));
    }

    private handleResult(result: NgbdModalChooseNodeContent_Output,index: number): void {
        for (var i = 0; i < this.productList[index].materialRequrimentList.length; i++) {
            if (this.productList[index].materialRequrimentList[i].name == result.choosed_leaf.name) {
                return;
            }
        }
        var p: MaterialRequriment = new MaterialRequriment;
        p.materialId = result.choosed_leaf.id;
        p.id = 0;
        p.unit = result.choosed_leaf.unit;
        p.name = result.choosed_leaf.name;
        p.count = result.num;
        this.productList[index].materialRequrimentList.push(p);
    }

    getParentPathInfo(material: any): string {
        let leaf = new Leaf();
        leaf.id = material.materialId;
        return this.tree_service.getParentPathInfo(this.material_root_node, leaf);
    }

    private updatematerialItemList() {
        this.materialItemList = [];
        var isExist: Boolean;

        this.productList.forEach(product_iter => {
            isExist = false;
            for (var i = 0; i < product_iter.materialRequrimentList.length; i++) {
                var materialItem_iter = product_iter.materialRequrimentList[i];
                isExist = false;
                for (var m in this.materialItemList) {
                    if (this.materialItemList[m].materialId == materialItem_iter.materialId) {
                        this.materialItemList[m].requrimentNum += Number(materialItem_iter.count);
                        console.log(this.materialItemList[m].requrimentNum);
                        isExist = true;
                    }
                }

                if (isExist == false) {
                    var tmp_materialitem = new DetailMaterialRequriment;
                    tmp_materialitem.name = materialItem_iter.name;
                    tmp_materialitem.id = materialItem_iter.id
                    tmp_materialitem.materialId = materialItem_iter.materialId;
                    tmp_materialitem.requrimentNum = Number(materialItem_iter.count);
                    this.materialItemList.push(tmp_materialitem);
                }
            }
        })
    }

    private updateDetailmaterialItemInfo() {
        this.updatematerialItemList();
        this.materialItemList.forEach(meterialItem => {
            this.material_stock_service.getMaterialStockById(meterialItem.materialId).
                subscribe(material_stock => {
                    meterialItem.shoppingNum = material_stock.shoppingNum;
                    meterialItem.instockNum = material_stock.instockNum;
                })
        })
    }

    private copyMaterialRequrimentArray(src: MaterialRequriment[]): any {
        let target: MaterialRequriment[] = [];
        src.forEach(iter => {
            let p: MaterialRequriment = new MaterialRequriment;
            p.count = iter.count;
            p.name = iter.name;
            p.unit = iter.unit;
            p.materialId = iter.materialId;
            p.id = iter.id;
            target.push(p);
        });
        return target;
    }

    private getParentName(materialId: number): string {
        let parent = this.tree_service.getParentByLeafId(materialId, undefined);
        return parent.name;
    }
}