import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule, JsonpModule }    from '@angular/http';

import { ProcurementComponent } from './procurement.component';
import { ProcurementRoutingModule } from './procurement-routing.module';
import { ProcurementService } from './procurement.service';

// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './in-memory-data.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        SharedModule,
        // InMemoryWebApiModule.forRoot(InMemoryDataService),
        JsonpModule,
        ProcurementRoutingModule
    ],

    declarations:[
        ProcurementComponent
    ],

    exports:[

    ],

    providers: [
        ProcurementService
    ]
})

export class ProcurementModule {

}