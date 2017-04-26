import { Component } from "@angular/core";
import { Input, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";

import { Product } from './product';



@Component({
    selector: 'products',
    moduleId: module.id,
    templateUrl: './templates/products-default.html'
}) 


export class ProductsComponent {
    @Input()
    productList: Product[];

    @Output()
    onEditProducts = new EventEmitter<void>();

    onEdit() : void {
        this.onEditProducts.emit();
    }
}