import { Component } from "@angular/core";
import { Input } from "@angular/core";

import { Product } from './product';


let NEWPRODUCT: Product = {
    id: -1,
    orderId: -1,
    name: 'My Product',
    count: 0,
    unit: '',
    price: 0,
    total: 0,
    comment: ''
};

@Component({
    selector: 'products-editable',
    moduleId: module.id,
    templateUrl: './templates/products-editable.html'
}) 

export class ProductsEditableComponent {
    @Input()
    productList: Product[];

    @Input()
    addedProductList: Product[];

    @Input()
    deletedProductList: Product[];

    newProduct: Product = new Product(NEWPRODUCT);

    onAddProduct(): void {
        this.productList.push(this.newProduct);
        this.newProduct = new Product(NEWPRODUCT);
        this.addedProductList.push(this.newProduct);
    }

    onDeleteProduct(product: Product): void {
        this.deletedProductList.push(product);
        let index = this.productList.indexOf(product);
        this.productList.splice(index, 1);
    }
}