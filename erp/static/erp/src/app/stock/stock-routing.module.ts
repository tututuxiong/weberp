import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MaterialStockComponent } from './materialStock.component'
import { ProductStockComponent } from './productStock.component'

import { AuthGuard } from "../core/admin/auth-guard.service";

const materialStockRoutes: Routes = [
    {path: 'materialsStock', component: MaterialStockComponent, canActivate: [AuthGuard]},
];

const productStockRoutes: Routes = [
    {path: 'productsStock', component: ProductStockComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [
        RouterModule.forRoot(productStockRoutes), //use forChild instead of forRoot
        RouterModule.forRoot(materialStockRoutes) //use forChild instead of forRoot
    ],

    exports: [
        RouterModule
    ]
})

export class StockRoutingModule {}

