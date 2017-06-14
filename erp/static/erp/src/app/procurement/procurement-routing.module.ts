import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ProcurementComponent } from './procurement.component';

import { AuthGuardSuper } from "../core/admin/auth-guard-super.service";

const procurementRoutes: Routes = [
    {
        path: 'procurement',
        component: ProcurementComponent,
        canActivate: [AuthGuardSuper],
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