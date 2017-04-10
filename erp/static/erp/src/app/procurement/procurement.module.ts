import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule, JsonpModule }    from '@angular/http';

import { ProcurementComponent } from './procurement.component';
import { ProcurementRoutingModule } from './procurement-routing.module';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        SharedModule,
        JsonpModule,
        ProcurementRoutingModule
    ],

    declarations:[
        ProcurementComponent
    ],
})

export class ProcurementModule {

}