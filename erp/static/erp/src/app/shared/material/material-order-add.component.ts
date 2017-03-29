import { Component, Input } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { MaterialOrder } from './material-order';

@Component({
  selector: 'ngbd-modal-content',
  moduleId: module.id,
  templateUrl: './templates/ngbd-modal-content.html'
})

export class NgbdModalContent {
    @Input()
    materialOrder: MaterialOrder;

    constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'new-material-order',
  moduleId: module.id,
  templateUrl: './templates/material-order-add.html'
})

export class MaterialOrderAddComponent {
  constructor(private modalService: NgbModal) {}

  @Input()
  materialOrderList: MaterialOrder[];

  @Input()
    orderId: number;

  newMaterialOrder: MaterialOrder;


  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    this.newMaterialOrder = new MaterialOrder(this.orderId);
    modalRef.componentInstance.materialOrder = this.newMaterialOrder;
  }
}