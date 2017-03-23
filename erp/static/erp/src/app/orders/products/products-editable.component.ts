import { Component } from "@angular/core";
import { Input } from "@angular/core";

import { Product } from './product';

const NEWPRODUCT: Product = {
    id: 0,
    orderId: 0,
    name: 'My Product',
    count: 0,
    unit: 'suite',
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

    newProduct: Product = Object.assign({}, NEWPRODUCT);

    onAddProduct(): void {
        let addedProduct: Product = Object.assign({}, this.newProduct);
        this.productList.push(addedProduct);
        this.addedProductList.push(addedProduct);
        this.newProduct = Object.assign({}, NEWPRODUCT);
    }

    onDeleteProduct(product: Product): void {
        this.deletedProductList.push(product);
        let index = this.productList.indexOf(product);
        this.productList.splice(index, 1);
    }
}