import { Component } from "@angular/core";
import { OnInit, Input } from "@angular/core";

import { StockService } from './stock.service';
import { TreeService } from './../shared/tree/tree.service';
import { Stock } from './Stock';
import { Leaf, Node } from './../shared/tree/tree';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalUpdateNodeContent } from './stock.update.comonent'
import { NgbdModalAddNodeContent } from './stock.addNode.component'
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
        private materialStockService: StockService,
        private treeService: TreeService,
        private modalService: NgbModal,
    ) {}
    materialStockList: Stock[];
    root_node: Node;
    errorMessage: string;
    choose_leaf: Leaf;
    
    /*show data*/
    titleName: string;
    buttonAddName: string;
    buttonInName: string;
    buttonOutName: string;

    modalOptions: NgbModalOptions = { size: "lg" }
    
    ngOnInit(): void {
        this.root_node = new Node();
        //this.getMaterialStocks();
        this.getTree();
        
        this.titleName = "原料信息";
        this.buttonAddName = "新增原料/分类";
        this.buttonInName = "入库"; 
        this.buttonOutName = "领料";
    }
    getMaterialStocks(): void {
        this.materialStockService.getMaterialStocks()
            .subscribe(
            materialsStock => this.materialStockList = materialsStock,
            error => this.errorMessage = <any>error);

    }

    getTree(): void{
        this.treeService.getMaterialRootTree().subscribe(materialTree => {
            this.root_node = materialTree;
        },
            error => this.errorMessage = <any>error)
    }
    onChooseLeaf(leaf: Leaf) {
        console.log(leaf)
        this.choose_leaf = leaf;
    }
    updateNode(type: number) {
        const modalRef = this.modalService.open(NgbdModalUpdateNodeContent, this.modalOptions);
        modalRef.componentInstance.type = type;
        modalRef.componentInstance.node_type = 0;
    }
    addNewNode(){
        const modalRef = this.modalService.open(NgbdModalAddNodeContent, this.modalOptions);
        modalRef.componentInstance.root_node = this.root_node;        
    }
    onFresh(){
        this.getTree();
    }
}