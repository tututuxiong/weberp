import { Component } from "@angular/core";
import { Input } from "@angular/core";
import { OnInit } from "@angular/core";
import { MaterialRequriment, Product } from './../products/product';
import { MaterialStock } from './../../materialStock/materialStock'
import { DetailMaterialRequriment } from './detail-material'
import { MaterialStockService } from './../../materialStock/materialStock.service';
import { ProductService } from './../products/product.service';
import { TreeService } from './../../tree/tree.service'
import { Node, Leaf } from './../../tree/tree'

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
    newMaterialName: string;
    newMaterialNumber: number;
    newMaterialUnit: string;
    errorMessage: string;

    mateialTree: Node;
    choose_leaf: Leaf;
    constructor(
        private material_stock_service: MaterialStockService,
        private product_service: ProductService,
        private tree_service: TreeService
    ) { }

    ngOnInit(): void {
        this.materialItemtEditable = false;
        this.newMaterialNumber = 0;
        this.mateialTree = new Node();
    }
    
    onChooseLeaf(leaf: Leaf){
        this.choose_leaf = leaf;
    }

    onSubmitEdit(index: number) {
        if (!this.checkEqual(index)) {
            this.updateDetailmaterialItemInfo();
            this.product_service.updateProducts(this.productList[index])
                .subscribe(prodtct => this.productList[index] = prodtct,
                error => this.errorMessage = <any>error)
        }

        this.materialItemtEditable = !this.materialItemtEditable;
    }

    private checkEqual(index: number): boolean {
        var isExist: Boolean;
        if (this.tmpProductMaterial.length != this.productList[index].materialRequrimentList.length) {
            return false;
        }
        else {
            for (var i = 0; i < this.tmpProductMaterial.length; i++) {
                for (var j = 0; j < this.productList[index].materialRequrimentList.length; j++) {
                    if (this.tmpProductMaterial[i].name == this.productList[index].materialRequrimentList[j].name
                        && this.tmpProductMaterial[i].count == this.productList[index].materialRequrimentList[j].count) {
                        isExist = true;
                        break;
                    }
                }
                if (isExist != true) {
                    return false;
                }
            }
        }
        return true;
    }

    onEdit(index: number) {
        this.tmpProductMaterial = this.copyMaterialRequrimentArray(this.productList[index].materialRequrimentList);
        this.materialItemtEditable = !this.materialItemtEditable;
        this.tree_service.getRootTree().subscribe(materialTree => this.mateialTree = materialTree)
    }

    onCancelEdit(index: any) {
        this.productList[index].materialRequrimentList = this.copyMaterialRequrimentArray(this.tmpProductMaterial);
        this.materialItemtEditable = !this.materialItemtEditable;
    }

    onDelete(index: number, materialRequrimentListIndex: number) {
        this.productList[index].materialRequrimentList.splice(materialRequrimentListIndex, 1);
    }

    onAdd(name: string, unit: string, num: number, index: number) {
        var nameWithUnit: string;
        nameWithUnit = name + '/' + unit;

        if (name == "" || unit == "") {
            return;
        }

        for (var i = 0; i < this.productList[index].materialRequrimentList.length; i++) {
            if (this.productList[index].materialRequrimentList[i].name == name) {
                return;
            }
        }
        var p: MaterialRequriment = new MaterialRequriment;
        p.count = num;
        p.name = name;
        p.unit = unit;
        this.productList[index].materialRequrimentList.push(p);

        this.newMaterialName = "";
        this.newMaterialUnit = "";
        this.newMaterialNumber = 0;
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
                    if (this.materialItemList[m].name == materialItem_iter.name) {
                        console.log( materialItem_iter.name);
                        console.log( this.materialItemList[m].requrimentNum);
                        console.log( materialItem_iter.count);
                        this.materialItemList[m].requrimentNum += Number(materialItem_iter.count);
                        console.log( this.materialItemList[m].requrimentNum);
                        isExist = true;
                    }
                }

                if (isExist == false) {
                    var tmp_materialitem = new DetailMaterialRequriment;
                    tmp_materialitem.name = materialItem_iter.name;
                    tmp_materialitem.requrimentNum = Number(materialItem_iter.count);
                    this.materialItemList.push(tmp_materialitem);
                }
            }
        })
    }

    private updateDetailmaterialItemInfo() {
        this.updatematerialItemList();
        this.materialItemList.forEach(meterialItem => {
            this.material_stock_service.getMaterialStockByName(meterialItem.name).
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
            target.push(p)
        });
        return target;
    }  
}