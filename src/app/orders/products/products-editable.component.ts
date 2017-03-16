import { Component } from "@angular/core";
import { Input } from "@angular/core";

import { Product } from './product';

@Component({
    selector: 'products-editable',
    moduleId: module.id,
    templateUrl: './templates/products-editable.html'
}) 

export class ProductsEditableComponent {
    @Input()
    productList: Product[];
}