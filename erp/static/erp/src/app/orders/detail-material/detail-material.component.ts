import { Component } from "@angular/core";
import { Input } from "@angular/core";
import { OnInit } from "@angular/core";
import { Product } from './../products/product';
import { MaterialStock } from './../../materialStock/materialStock'

@Component({
    selector: 'detail-material',
    moduleId: module.id,
    templateUrl: './templates/detail-material.html'
})

export class DetailMaterialComponent  implements OnInit {
    @Input()
    productList: Product[];
    
    @Input()
    materialItemList: {};

    ngOnInit() : void {
        //this.updatematerialItemList();
    }

    private updatematerialItemList(){
        this.materialItemList = {}
        var  isExist : Boolean;
        
        this.productList.forEach(product_iter =>{
            for (var k in product_iter.materialList){
                isExist = false;
                for (var m in this.materialItemList){
                    if (k == m){
                        this.materialItemList[m] += product_iter.materialList[k];
                        console.log(k,":",this.materialItemList[m]);
                        isExist = true;
                    }
                }

                if (isExist == false){
                    this.materialItemList[k] = product_iter.materialList[k];
                    console.log(k,":",this.materialItemList[m]);
                }
            }
        })
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
        console.log(r);
        return r;
    }    
}