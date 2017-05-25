import { infoData } from './stock';
import { Component } from "@angular/core";
import { OnInit, Input } from "@angular/core";
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'ngbd-modal-content',
    moduleId: module.id,
    templateUrl: "static/erp/src/app/stock/templates/stock-info.html",
})

export class NgbdModalStockRecord {
    @Input() info: infoData;
    url: string;
    name: string;
    ngOnInit(): void {
        this.url = this.info.pathInfo + this.info.fileName;
        this.name = this.info.fileName;
    }
    constructor(public activeModal: NgbActiveModal) {}    
}