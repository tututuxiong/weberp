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
        this.root_path = "/";
    }
    materialStockList: MaterialStock[];
    root_tree: Tree;
    errorMessage: string;
    root_path: string;

    getMaterialStocks(): void {
        this.materialStockService.getMaterialStocks()
            .subscribe(
            materialsStock => this.materialStockList = materialsStock,
            error => this.errorMessage = <any>error);

    }

    getTree(): void{
        this.treeService.getRootTree().subscribe(materialTree => {
            this.root_tree = materialTree;
        },
        error => this.errorMessage = <any>error)
    }
}
