import { Component } from "@angular/core";
import { OnInit, Input } from "@angular/core";

import { MaterialStockService } from './materialStock.service';
import { TreeService } from './../shared/tree/tree.service';
import { MaterialStock } from './materialStock';
import { Leaf, Node,LeafUpdate } from './../shared/tree/tree';
import {NgbModal, NgbActiveModal,NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

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
        private modalService: NgbModal,
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

    modalOptions: NgbModalOptions = {size: "lg"}

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
    updateNode()
    {
        const modalRef = this.modalService.open(NgbdModalUpdateNodeContent, this.modalOptions);
        modalRef.componentInstance.name = 'World';
        modalRef.componentInstance.root_node = this.root_node;
    }
}

@Component({
  selector: 'ngbd-modal-content',
  moduleId: module.id,
  templateUrl: "./templates/materialStock.updatenode.html",
})
export class NgbdModalUpdateNodeContent {
  @Input() name:string;
  @Input() root_node: Node;
  choose_leaf: Leaf;
  updateCount: LeafUpdate;

  constructor(public activeModal: NgbActiveModal) {}
    
  onChooseLeaf(leaf: Leaf){
        this.choose_leaf = leaf;
        this.updateCount.id = leaf.id;
        this.updateCount.type = 0;
    }
}

