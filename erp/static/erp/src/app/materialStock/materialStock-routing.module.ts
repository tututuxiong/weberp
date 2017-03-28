import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import {MaterialStockComponent} from './materialStock.component'

const materialStockRoutes: Routes = [
    {path: 'materialsStock', component: MaterialStockComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(materialStockRoutes) //use forChild instead of forRoot
    ],

    exports: [
        RouterModule
    ]
})

export class MaterialStockRoutingModule {}

