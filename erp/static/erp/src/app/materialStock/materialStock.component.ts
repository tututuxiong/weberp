import { Component } from "@angular/core";
import { OnInit } from "@angular/core";

import { MaterialStockService } from './materialStock.service';
import { TreeService } from './../tree/tree.service';
import { MaterialStock } from './materialStock';
import { Tree, Node } from './../tree/tree';

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
        this.root_tree = new Tree();
        this.getMaterialStocks();
        this.getTree();
    }
    materialStockList: MaterialStock[];
    root_tree: Tree;
    errorMessage: string;

    getMaterialStocks(): void {
        this.materialStockService.getMaterialStocks()
            .subscribe(
            materialsStock => this.materialStockList = materialsStock,
            error => this.errorMessage = <any>error);

    }

    getTree(): void{
        this.treeService.getRootTree().subscribe(materialTree => {
            this.root_tree = materialTree;
            console.log(this.root_tree.nodes);
            console.log(this.root_tree.name);
            console.log(this.root_tree.subTrees);
        },
        error => this.errorMessage = <any>error)
    }
}
