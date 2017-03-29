import { Component } from "@angular/core";
import { Input } from "@angular/core";

import { MaterialSubOrder } from './material-sub-order';

@Component({
    selector: 'material-sub-order-editable',
    moduleId: module.id,
    templateUrl: './templates/material-sub-order-editable.html'
})

export class MaterialSubOrderEditableComponent {
    @Input()
    materialSubOrderList: MaterialSubOrder[];
}