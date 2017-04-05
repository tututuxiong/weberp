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

    @Input()
    path: string;

    spacing: string;

    ngOnInit(): void {
        this.spacing = ":";
    }
    AddNode() {
        console.log(this.path);
        console.log(this.root_tree.name);
    }
    AddSubTree() {
        console.log(this.path);
        console.log(this.root_tree.name);
    }    
}
