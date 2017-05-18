import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule, JsonpModule }    from '@angular/http';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { MaterialStockComponent} from './materialStock.component'
import { ProductStockComponent} from './productStock.component'
import { NgbdModalUpdateNodeContent } from './stock.update.comonent'
import { NgbdModalAddNodeContent } from './stock.addNode.component'
import { NgbdModalChooseNodeContent } from './stock.choose.component'
import { StockService} from './stock.service'
import { NgbdModalStockRecord } from './stock.record.component'
import { StockRoutingModule } from './stock-routing.module'
import {TreeModule} from './../shared/tree/tree.module'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        NgbModule,
        StockRoutingModule,
        TreeModule,
    ],

    declarations: [
        MaterialStockComponent,
        ProductStockComponent,
        NgbdModalUpdateNodeContent,
        NgbdModalAddNodeContent,
        NgbdModalChooseNodeContent,
        NgbdModalStockRecord
    ],
    providers: [
        StockService
    ],
    entryComponents: [
        NgbdModalUpdateNodeContent,
        NgbdModalAddNodeContent,
        NgbdModalChooseNodeContent,
        NgbdModalStockRecord
    ],

})

export class StockModule {}
