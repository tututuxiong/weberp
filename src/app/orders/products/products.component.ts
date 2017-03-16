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
}