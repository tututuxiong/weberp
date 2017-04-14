import { Component } from "@angular/core";
import { Input, Output, EventEmitter, OnChanges, SimpleChange } from "@angular/core";
import { Leaf, Node } from './tree';
import { OnInit } from "@angular/core";
// Component definition
@Component({
    //selector is not needed here because we use routing.
    selector: "dropdown-tree-view",
    moduleId: module.id,
    templateUrl: "./templates/dropdown-tree.component.html",
    //styleUrls: ["./styles/orders.component.css"]
})

export class DropdownTreeComponent implements OnInit {
    @Input()
    root_node: Node;

    @Output()
    choose_leaf = new EventEmitter<Leaf>();

    selectTargets: Node[];

    ngOnInit(): void {
        console.log(this.root_node);
    }
    
    ngOnChanges(changes: SimpleChange) {
        for (let propName in changes) {
            if (propName == "root_node")
            {
                this.selectTargets = [];
                this.selectTargets.push(this.root_node);
            }
        }
        console.log(this.selectTargets);
    }

    onChooseLeaf(leaf: Leaf) {
        this.choose_leaf.emit(leaf);
    }

    onChangeObj(newObj: any, index: number) {
        console.log(newObj);
        console.log(index);
        console.log(this.selectTargets.length);
        console.log(typeof(newObj));
        let tempLeaf = new Leaf();
        //check node or leaf
        if (newObj.leafs != undefined){
            if (index != (this.selectTargets.length -1)){
                 this.selectTargets.splice(index + 1 , this.selectTargets.length - (index -1));
            }
            this.selectTargets.push(newObj);
            this.choose_leaf.emit(tempLeaf);
        }
        else{
            this.choose_leaf.emit(newObj);
            if (index != (this.selectTargets.length -1)){
                this.selectTargets.splice(index + 1 , this.selectTargets.length - (index -1));
            }
        }
    }
}
