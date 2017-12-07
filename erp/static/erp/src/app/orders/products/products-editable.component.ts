import { Component } from "@angular/core";
import { Input, Output, OnInit } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { TreeService } from './../../shared/tree/tree.service';
import { Node, Leaf } from './../../shared/tree/tree';

import { MaterialRequriment, Product } from './product';
import { NgbdModalChooseNodeContent, NgbdModalChooseNodeContent_Output } from './../../stock/stock.choose.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

const NEWPRODUCT: Product = {
    id: 0,
    orderId: 0,
    stockId: 0,
    name: 'My Product',
    count: 0,
    unit: 'N/A',
    price: 0,
    comment: '',
    pathInfo: '',
    materialRequrimentList: [],
};



@Component({
    selector: 'products-editable',
    moduleId: module.id,
    templateUrl: 'static/erp/src/app/orders/products/templates/products-editable.html'
})

export class ProductsEditableComponent implements OnInit {
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

    product_root_node: Node;

    constructor(
        private tree_service: TreeService,
        private modalService: NgbModal,
    ) { }

    ngOnInit(): void {
        this.product_root_node = this.tree_service.getProductRootTreeInMemory();
    }

    getParentPathInfo(product: Product): string {
        let leaf = new Leaf();
        leaf.id = product.stockId;
        return this.tree_service.getParentPathInfo(this.product_root_node, leaf);
    }

    onAddProduct(): void {
        const modalRef = this.modalService.open(NgbdModalChooseNodeContent);
        modalRef.componentInstance.root_node = this.product_root_node;

        modalRef.result.then(result => this.handleResult(result));
    }

    private handleResult(result: NgbdModalChooseNodeContent_Output): void {
        console.log(result);
        let newProduct = Object.assign({}, NEWPRODUCT);
        newProduct.stockId = result.choosed_leaf.id;
        newProduct.unit = result.choosed_leaf.unit;
        newProduct.name = result.choosed_leaf.name;
        newProduct.count = result.num;
        newProduct.materialRequrimentList = [];

        this.productList.push(newProduct);
        this.addedProductList.push(newProduct);
    }

    onDeleteProduct(product: Product): void {
        this.deletedProductList.push(product);
        let index = this.productList.indexOf(product);
        this.productList.splice(index, 1);
    }

    onSubmitEdit(): void {
        this.onSubmitEditProducts.emit();
    }

    onCancelEdit(): void {
        this.onCancelEditProducts.emit();
    }
}