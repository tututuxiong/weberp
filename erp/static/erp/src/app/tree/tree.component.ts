import { Component } from "@angular/core";
import { Input } from "@angular/core";
import { Tree, Node } from './tree';

// Component definition
@Component({
    //selector is not needed here because we use routing.
    selector: "tree-view",
    moduleId: module.id,
    templateUrl: "./templates/tree.component.html",
    //styleUrls: ["./styles/orders.component.css"]
})

export class TreeComponent{
    @Input()
    root_tree: Tree;
}
