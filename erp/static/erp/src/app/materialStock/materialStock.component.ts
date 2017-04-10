import { Component } from "@angular/core";
import { OnInit } from "@angular/core";

import { MaterialStockService } from './materialStock.service';
import { TreeService } from './../tree/tree.service';
import { MaterialStock } from './materialStock';
import { Leaf, Node } from './../tree/tree';

// Component definition
@Component({
    //selector is not needed here because we use routing.
    //selector: "my-orders",
    moduleId: module.id,
    templateUrl: "./templates/materialStock.component.html",
    //styleUrls: ["./styles/orders.component.css"]
})

export class MaterialStockComponent implements OnInit {
    constructor(
        private materialStockService: MaterialStockService,
        private treeService: TreeService,
    ) { }

    ngOnInit(): void {
        this.root_node = new Node();
        //this.getMaterialStocks();
        this.getTree();
        this.root_path = "/";
        this.tree_type = "M";
    }
    materialStockList: MaterialStock[];
    root_node: Node;
    errorMessage: string;
    root_path: string;
    tree_type: string;
    choose_leaf: Leaf;

    getMaterialStocks(): void {
        this.materialStockService.getMaterialStocks()
            .subscribe(
            materialsStock => this.materialStockList = materialsStock,
            error => this.errorMessage = <any>error);

    }

    getTree(): void{
        this.treeService.getRootTree().subscribe(materialTree => {
            this.root_node = materialTree;
        },
        error => this.errorMessage = <any>error)
    }
    onChooseLeaf(leaf: Leaf){
        this.choose_leaf = leaf;
    }
}
