import { Component } from "@angular/core";
import { OnInit, Input } from "@angular/core";

import { StockService } from './stock.service';
import { TreeService } from './../shared/tree/tree.service';
import { Stock,infoData } from './stock';
import { Leaf, Node } from './../shared/tree/tree';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalUpdateNodeContent, NgbdModalUpdateNodeContent_Output } from './stock.update.comonent'
import { NgbdModalAddNodeContent } from './stock.addNode.component'
import { NgbdModalStockRecord } from './stock.record.component'

// Component definition
@Component({
    //selector is not needed here because we use routing.
    //selector: "my-orders",
    moduleId: module.id,
    templateUrl: "static/erp/src/app/stock/templates/materialStock.component.html",
    //styleUrls: ["./styles/orders.component.css"]
})

export class MaterialStockComponent implements OnInit {
    constructor(
        private materialStockService: StockService,
        private treeService: TreeService,
        private modalService: NgbModal,
    ) { }
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

    getTree(): void {
        this.treeService.getMaterialRootTree().subscribe(materialTree => {
            this.root_node = materialTree;
            console.log(this.root_node);
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

        modalRef.result.then(result => this.handleResult(result));
    }

    private handleResult(result: NgbdModalUpdateNodeContent_Output): void {
        let stockInfo = this.treeService.findNodeInTree(this.root_node, result.leafId);
        if (result.type == 0) {
            stockInfo.instockNum += result.num;
        }
        else {
            stockInfo.instockNum -= result.num;
        }
    }

    addNewNode() {
        const modalRef = this.modalService.open(NgbdModalAddNodeContent, this.modalOptions);
        modalRef.componentInstance.root_node = this.root_node;
    }
    onFresh() {
        this.getTree();
    }

    onFetchCheckIn(){
        this.materialStockService.getCheckInInfo().subscribe(info=>
        {
            const modalRef = this.modalService.open(NgbdModalStockRecord, this.modalOptions);
            modalRef.componentInstance.info = info;
        });
    }
    onFetchCheckOut(){
        this.materialStockService.getCheckOutInfo().subscribe(info=>
        {
            const modalRef = this.modalService.open(NgbdModalStockRecord, this.modalOptions);
            modalRef.componentInstance.info = info;
        });
    }
    onFetchMaterialStock(){
        this.materialStockService.getMaterialStockExeclInfo().subscribe(info=>
        {
            const modalRef = this.modalService.open(NgbdModalStockRecord, this.modalOptions);
            modalRef.componentInstance.info = info;
        });
    }
}