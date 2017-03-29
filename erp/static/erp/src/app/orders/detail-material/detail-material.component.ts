import { Component } from "@angular/core";
import { Input } from "@angular/core";
import { OnInit } from "@angular/core";
import { Product } from './../products/product';
import { MaterialStock } from './../../materialStock/materialStock'
import { DetailMaterialRequriment} from './detail-material'

@Component({
    selector: 'detail-material',
    moduleId: module.id,
    templateUrl: './templates/detail-material.html'
})

export class DetailMaterialComponent  implements OnInit {
    @Input()
    productList: Product[];

    @Input()
    materialItemList: DetailMaterialRequriment[];

    materialItemtEditable: Boolean;
    tmpProductMaterial: {};

    ngOnInit() : void {
        this.materialItemtEditable  = false;
    }


    private onSubmitEdit(index: any){
        this.materialItemtEditable = !this.materialItemtEditable;
        console.log("onsubmit:",this.productList[index].materialList);
    }

    private onEdit(index: any){
        this.materialItemtEditable = !this.materialItemtEditable;
        this.tmpProductMaterial = this.copyDict(this.productList[index].materialList);
        console.log("onedit:",this.tmpProductMaterial);
    }

    private onCancelEdit(index: any){
        this.materialItemtEditable = !this.materialItemtEditable;
        this.tmpProductMaterial = this.copyDict(this.productList[index].materialList);
        console.log("onedit:",this.tmpProductMaterial);
    }

    private copyDict(src:any): any {
        var target : any = {};
        for (var k in src) {
            console.log("src: ",k,":",src[k])
            target[k] = src[k];
            console.log("target: ",k,":",target[k])
        }
        return target;
    }

    private toList(dict:any) : any {
        var r : any = [];
        for (var k in dict) {
            var e = {
                text : k,
                value : dict[k],
            };
            r.push(e);
        }
        return r;
    }
}