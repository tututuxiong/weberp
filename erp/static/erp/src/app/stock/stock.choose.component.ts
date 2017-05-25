import { Component } from "@angular/core";
import { OnInit, Input } from "@angular/core";
import { TreeService } from './../shared/tree/tree.service';
import { Leaf, Node } from './../shared/tree/tree';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';



export class  NgbdModalChooseNodeContent_Output{
    choosed_leaf: Leaf;
    parentInfo: string;
    num: number;
}

@Component({
    selector: 'ngbd-modal-content',
    moduleId: module.id,
    templateUrl: "static/erp/src/app/stock/templates/stock.choose.html",
})
export class NgbdModalChooseNodeContent implements OnInit {
    @Input() root_node: Node;
    
    title: string;
    return_value: NgbdModalChooseNodeContent_Output;

    constructor(
        public activeModal: NgbActiveModal,
        private treeService: TreeService)
        {}

    ngOnInit(): void {
        this.title = "请选择产品/原材料";
        this.return_value = new NgbdModalChooseNodeContent_Output();
        this.return_value.num = 0;
    }

    onChooseLeaf(leaf: Leaf) {
        console.log(leaf)
        this.return_value.choosed_leaf = leaf;
    }

    onSubmit(){
        if (this.return_value.num == 0){
            console.log("please input price and num")
            return;
        }
        this.return_value.parentInfo = this.treeService.getParentPathInfo(this.root_node, this.return_value.choosed_leaf);
        this.activeModal.close(this.return_value);
    }
}