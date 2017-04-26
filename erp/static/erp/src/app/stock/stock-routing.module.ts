import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MaterialStockComponent } from './materialStock.component'
import { ProductStockComponent } from './productStock.component'

const materialStockRoutes: Routes = [
    {path: 'materialsStock', component: MaterialStockComponent},
];

const productStockRoutes: Routes = [
    {path: 'productsStock', component: ProductStockComponent},
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

