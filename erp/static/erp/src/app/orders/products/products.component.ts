import { Component } from "@angular/core";
import { Input } from "@angular/core";

import { Product } from './product';



@Component({
    selector: 'products',
    moduleId: module.id,
    templateUrl: './templates/products-default.html'
}) 


export class ProductsComponent {
    @Input()
    productList: Product[];
    
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