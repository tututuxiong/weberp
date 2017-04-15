import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule, JsonpModule }    from '@angular/http';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { MaterialStockComponent} from './materialStock.component'
import { NgbdModalUpdateNodeContent } from './materialStock.update.comonent'
import {MaterialStockService} from './materialStock.service'

import {MaterialStockRoutingModule} from './materialStock-routing.module'
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
        NgbdModalUpdateNodeContent
    ],
    providers: [
        MaterialStockService
    ],
    entryComponents: [
        NgbdModalUpdateNodeContent
    ],

})

export class MaterialStockModule {}
