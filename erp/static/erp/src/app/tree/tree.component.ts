import { Component } from "@angular/core";
import { Input } from "@angular/core";
import { Tree, Node } from './tree';
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
    root_tree: Tree;
  
    addNewNodeFlag: boolean;
    newNode: Node;

    ngOnInit(): void {
        this.addNewNodeFlag = false;
        this.newNode = new Node();
        this.newNode.parentId = this.root_tree.id;
    }
    AddNode() {
        this.addNewNodeFlag = true;
        console.log(this.root_tree.id);
        console.log(this.root_tree.name);
    }
    AddNodeCompelet(){
        if (this.newNode.name.length != 0)
        {
            this.root_tree.nodes.push(this.newNode);
            this.newNode = new Node();
        }        
        this.addNewNodeFlag = false;
    }
    AddSubTree() {
        console.log(this.root_tree.id);
        console.log(this.root_tree.name);
    }
}
