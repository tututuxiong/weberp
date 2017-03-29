import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MaterialOrderComponent } from './material/material-order.component';
import { NgbdModalContent, MaterialOrderAddComponent } from './material/material-order-add.component';
import { MaterialSubOrderComponent } from './material/material-sub-order.component';
import { MaterialSubOrderEditableComponent } from './material/material-sub-order-editable.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        NgbModule.forRoot()
    ],

    declarations: [
         MaterialOrderComponent,
         MaterialOrderAddComponent,
         MaterialSubOrderComponent,
         MaterialSubOrderEditableComponent,
         NgbdModalContent
    ],

    entryComponents: [
        NgbdModalContent
    ],

    exports: [
         MaterialOrderComponent,
         MaterialOrderAddComponent,
         MaterialSubOrderComponent,
         MaterialSubOrderEditableComponent
    ]
})

export class SharedModule {}