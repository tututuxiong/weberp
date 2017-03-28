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

    ngOnInit() : void {
        //this.updatematerialItemList();
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