import { Component } from "@angular/core";
import { Input, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { Node, Leaf } from './../../shared/tree/tree';
import { TreeService } from './../../shared/tree/tree.service';
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
    product_root_node: Node;
    constructor(
        private tree_service: TreeService
    ) {}   

    onEdit(): void {
        this.onEditProducts.emit();
    }
    ngOnInit(): void {
        this.tree_service.getProductRootTree().subscribe(productTree => {
            this.product_root_node = productTree;
        });
    }
    getParentPathInfo(product: Product): string {
        let leaf = new Leaf();
        leaf.id = product.stockId;
        return this.tree_service.getParentPathInfo(this.product_root_node, leaf);
    }
}