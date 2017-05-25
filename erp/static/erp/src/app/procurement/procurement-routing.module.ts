import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ProcurementComponent } from './procurement.component';

import { AuthGuard } from "../core/admin/auth-guard.service";

const procurementRoutes: Routes = [
    {
        path: 'procurement',
        component: ProcurementComponent,
        canActivate: [AuthGuard],
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