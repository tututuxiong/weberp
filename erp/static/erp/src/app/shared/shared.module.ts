import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MaterialOrder } from './material/material-order';
import { MaterialOrderComponent } from './material/material-order.component';
import { MaterialSubOrderComponent } from './material/material-sub-order.component';
import { MaterialSubOrderEditableComponent } from './material/material-sub-order-editable.component';

@NgModule({
    imports: [
        CommonModule
    ],

    declarations: [
         MaterialOrderComponent,
         MaterialSubOrderComponent,
         MaterialSubOrderEditableComponent
    ],

    exports: [
         MaterialOrderComponent,
         MaterialSubOrderComponent,
         MaterialSubOrderEditableComponent
    ]
})

export class SharedModule {}