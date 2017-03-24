import { Component } from "@angular/core";
import { Input } from "@angular/core";

import { MaterialOrder } from './material-order';

@Component({
    selector: 'material-order',
    moduleId: module.id,
    templateUrl: './templates/material-order.html'
})

export class MaterialOrderComponent {
    @Input()
    materialOrderList: MaterialOrder[];
}