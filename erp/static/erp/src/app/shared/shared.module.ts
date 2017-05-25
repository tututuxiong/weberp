import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

/* Components */
import { MaterialOrderComponent } from './material/material-order.component';
import { NgbdModalContent, MaterialOrderAddComponent } from './material/material-order-add.component';
import { MaterialSubOrderComponent } from './material/material-sub-order.component';
import { MaterialSubOrderEditableComponent } from './material/material-sub-order-editable.component';

/* Services */
import { MaterialOrderService } from './material/material-order.service';

/* External */
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
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
         MaterialSubOrderEditableComponent,
    ],

    providers: [
        MaterialOrderService,
    ]
})

export class SharedModule {}