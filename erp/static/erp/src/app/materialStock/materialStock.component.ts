import { Component } from "@angular/core";
import { OnInit } from "@angular/core";

import { MaterialStockService } from './materialStock.service';
import { MaterialStock } from './materialStock';

// Component definition
@Component({
    //selector is not needed here because we use routing.
    //selector: "my-orders",
    moduleId: module.id,
    templateUrl: "./templates/materialStock.component.html",
    //styleUrls: ["./styles/orders.component.css"]
})

export class MaterialStockComponent implements OnInit {
    constructor(
        private materialStockService: MaterialStockService
    ) {}

        ngOnInit() : void {
        this.getMaterialStocks();
    }
    materialStockList: MaterialStock[];
    errorMessage: string;

        getMaterialStocks(): void {
        this.materialStockService.getMaterialStocks()
                         .subscribe(
                           materialsStock => this.materialStockList = materialsStock,
                           error => this.errorMessage = <any>error);
    }
}
