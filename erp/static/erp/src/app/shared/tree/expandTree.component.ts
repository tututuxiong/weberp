import { Component } from "@angular/core";
import { Input } from "@angular/core";
import { Leaf, Node } from './tree';
import { OnInit } from "@angular/core";
import { TreeService } from "./tree.service"
// Component definition
@Component({
    //selector is not needed here because we use routing.
    selector: "expandTree-view",
    moduleId: module.id,
    templateUrl: "./templates/expandTree.component.html",
    //styleUrls: ["./styles/orders.component.css"]
})

export class ExpandTreeComponent implements OnInit {
    @Input()
    root_node: Node;
    isExpand: boolean;
    newNode: Node;
    editNewNode: boolean;
    newLeaf: Leaf;
    editNewLeaf: boolean;
    errorMessage: string;

    constructor(
        private treeService: TreeService,
    ) { }

    ngOnInit(): void {
        this.isExpand = false;
        this.editNewNode = false;
    }
    expand() {
        this.isExpand = !this.isExpand;
    }
    addNewNode(node: Node) {
        this.newNode = new Node();
        this.editNewNode = !this.editNewNode;
    }
    addNewLeaf(node: Node) {
        this.newLeaf = new Leaf();
        this.editNewLeaf = !this.editNewLeaf;
    }
    submitNewNode() {
        if (this.newNode.name != "") {
            this.newNode.id = 0;
            this.newNode.parentId = this.root_node.id;
            this.treeService.addNewNode(this.newNode).
                subscribe(
                newnode => {
                    this.root_node.subNodes.push(newnode)
                    this.editNewNode = false;
                },
                error => this.errorMessage = <any>error);
        }
    }

    submitNewLeaf() {
        if (this.newLeaf.name != "" && this.newLeaf.unit != "") {
            this.newLeaf.id = 0;
            this.newLeaf.parentId = this.root_node.id;
            this.treeService.addNewLeaf(this.newLeaf).
                subscribe(
                newleaf => {
                    this.root_node.leafs.push(newleaf);
                    this.editNewLeaf = false;
                },
                error => this.errorMessage = <any>error);
        }
    }    
}
