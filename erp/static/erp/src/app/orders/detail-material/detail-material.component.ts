import { Component } from "@angular/core";
import { Input } from "@angular/core";
import { OnInit } from "@angular/core";
import { MaterialRequriment, Product } from './../products/product';
import { MaterialStock } from './../../materialStock/materialStock'
import { DetailMaterialRequriment } from './detail-material'
import { MaterialStockService } from './../../materialStock/materialStock.service';

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

    constructor(private material_stock_service: MaterialStockService) {
    }

    ngOnInit(): void {
        this.materialItemtEditable = false;
        this.newMaterialNumber = 0;
    }

    onSubmitEdit(index: any) {
        console.log("onsubmit:", this.productList[index].materialRequrimentList);
        this.updateDetailmaterialItemInfo();
        this.materialItemtEditable = !this.materialItemtEditable;
    }

    onEdit(index: number) {
        console.log(this.productList[index].materialRequrimentList);
        console.log(this.productList[index].materialRequrimentList.length);
        this.tmpProductMaterial = this.copyMaterialRequrimentArray(this.productList[index].materialRequrimentList);
        this.materialItemtEditable = !this.materialItemtEditable;
    }

    onCancelEdit(index: any) {
        this.productList[index].materialRequrimentList = this.copyMaterialRequrimentArray(this.tmpProductMaterial);
        this.materialItemtEditable = !this.materialItemtEditable;
    }

    onDelete(index: number, materialRequrimentListIndex: number) {
        console.log(this.productList[index].materialRequrimentList);
        console.log(materialRequrimentListIndex);

        this.productList[index].materialRequrimentList.splice(materialRequrimentListIndex, 1);
        console.log(this.productList[index].materialRequrimentList);
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
            console.log("updatematerialItemList:", product_iter)
            for (var i = 0; i < product_iter.materialRequrimentList.length; i++) {
                var materialItem_iter = product_iter.materialRequrimentList[i];
                isExist = false;
                for (var m in this.materialItemList) {
                    if (this.materialItemList[m].name == materialItem_iter.name) {
                        this.materialItemList[m].requrimentNum += materialItem_iter.count;
                        isExist = true;
                    }
                }

                if (isExist == false) {
                    var tmp_materialitem = new DetailMaterialRequriment;
                    tmp_materialitem.name = materialItem_iter.name;
                    tmp_materialitem.requrimentNum = materialItem_iter.count;
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

    private copyMaterialRequrimentArray(src: MaterialRequriment[]) : any {
        let target: MaterialRequriment[] = [];
        src.forEach(iter=>target.push(iter));
        return target;
    }
}