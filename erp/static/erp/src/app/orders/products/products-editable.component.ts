import { Component } from "@angular/core";
import { Input, Output, OnInit } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { TreeService } from './../../shared/tree/tree.service'
import { Node, Leaf } from './../../shared/tree/tree'

import {MaterialRequriment, Product } from './product';

const NEWPRODUCT: Product = {
    id: 0,
    orderId: 0,
    stockId: 0,
    name: 'My Product',
    count: 0,
    unit: 'N/A',
    price: 0,
    comment: '',
    materialRequrimentList: [],
};

@Component({
    selector: 'products-editable',
    moduleId: module.id,
    templateUrl: './templates/products-editable.html'
}) 

export class ProductsEditableComponent implements OnInit{
    @Input()
    productList: Product[];

    @Input()
    addedProductList: Product[];

    @Input()
    deletedProductList: Product[];

    @Output()
    onSubmitEditProducts = new EventEmitter<void>();

    @Output()
    onCancelEditProducts = new EventEmitter<void>();

    productStockList: Leaf[];

    constructor(
        private tree_service: TreeService,
    ){}

    ngOnInit(): void {
        this.productStockList = [];
        
        this.tree_service.getProductRootTree().subscribe(productTree =>{
            productTree.leafs.forEach( product =>{
                this.productStockList.push(product);
            });
            
        });
    }

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

    onSubmitEdit() : void {
        this.onSubmitEditProducts.emit();
    }

    onCancelEdit() : void {
        this.onCancelEditProducts.emit();
    }

    onChange(leaf: Leaf){
        this.newProduct.stockId = leaf.id;
        this.newProduct.unit = leaf.unit;
        this.newProduct.name = leaf.name;
    }
}