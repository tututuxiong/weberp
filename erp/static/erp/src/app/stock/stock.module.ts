import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule, JsonpModule }    from '@angular/http';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { MaterialStockComponent} from './materialStock.component'
import { NgbdModalUpdateNodeContent } from './stock.update.comonent'
import { NgbdModalAddNodeContent } from './stock.addNode.component'
import { StockService} from './stock.service'

import {MaterialStockRoutingModule} from './stock-routing.module'
import {TreeModule} from './../shared/tree/tree.module'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        NgbModule,
        MaterialStockRoutingModule,
        TreeModule,
    ],

    declarations: [
        MaterialStockComponent,
        NgbdModalUpdateNodeContent,
        NgbdModalAddNodeContent
    ],
    providers: [
        StockService
    ],
    entryComponents: [
        NgbdModalUpdateNodeContent,
        NgbdModalAddNodeContent
    ],

})

export class StockModule {}
