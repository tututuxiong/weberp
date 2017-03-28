import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ProcurementComponent } from './procurement.component';

const procurementRoutes: Routes = [
    {
        path: 'procurement',
        component: ProcurementComponent,
        children: [

        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(procurementRoutes)
    ],

    exports: [
        RouterModule
    ]
})

export class ProcurementRoutingModule {}