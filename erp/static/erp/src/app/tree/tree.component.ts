import { Component } from "@angular/core";
import { Input } from "@angular/core";
import { Leaf, Node } from './tree';
import { OnInit } from "@angular/core";
// Component definition
@Component({
    //selector is not needed here because we use routing.
    selector: "tree-view",
    moduleId: module.id,
    templateUrl: "./templates/tree.component.html",
    //styleUrls: ["./styles/orders.component.css"]
})

export class TreeComponent implements OnInit {
    @Input()
    root_node: Node;

    @Input()
    tree_type: string;
  
    addnewLeafFlag: boolean;
    newLeaf: Leaf;
    isMaterialTree:boolean;
    haveLeafs:boolean;

    ngOnInit(): void {
        this.addnewLeafFlag = false;
        this.newLeaf = new Leaf();
        this.newLeaf.parentId = this.root_node.id;
        console.log(this.root_node.name,this.root_node.leafs)
        this.haveLeafs = true;//(this.root_node.leafs.length != 0);
        this.isMaterialTree = (this.tree_type == "M");
    }
    AddNode() {
        this.addnewLeafFlag = true;
        console.log(this.root_node.id);
        console.log(this.root_node.name);
    }
    AddNodeCompelet(){
        if (this.newLeaf.name.length != 0)
        {
            this.root_node.leafs.push(this.newLeaf);
            this.newLeaf = new Node();
        }        
        this.addnewLeafFlag = false;
    }
    AddSubTree() {
        console.log(this.root_node.id);
        console.log(this.root_node.name);
    }
}
