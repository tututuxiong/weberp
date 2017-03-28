import { Component } from "@angular/core";
import { Input } from "@angular/core";

import { MaterialSubOrder } from './material-sub-order';

@Component({
    selector: 'material-sub-order',
    moduleId: module.id,
    templateUrl: './templates/material-sub-order-default.html'
})

export class MaterialSubOrderComponent {
    @Input()
    materialSubOrderList: MaterialSubOrder[];
}