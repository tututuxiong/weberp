import { Component, Input, OnInit } from '@angular/core';

import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { MaterialOrder } from './material-order';
import { MaterialSubOrder } from './material-sub-order';

@Component({
  selector: 'ngbd-modal-content',
  moduleId: module.id,
  templateUrl: './templates/ngbd-modal-content.html'
})

export class NgbdModalContent implements OnInit {
    @Input()
    materialOrder: MaterialOrder;

    materialOrderOld: MaterialOrder;

    ngOnInit() {
      this.materialOrderOld = this.copyMaterialOrder(this.materialOrder);
    }

    constructor(public activeModal: NgbActiveModal) {

    }

    onSubmit() : void {
      this.materialOrder.modifyMode = false;
      this.materialOrderOld = this.copyMaterialOrder(this.materialOrder);
    }

    onAbort() : void {
      this.materialOrder = this.copyMaterialOrder(this.materialOrderOld);
      this.materialOrder.modifyMode = false;
    }

    onModify() : void {
      this.materialOrder.modifyMode = true;
    }

    onSubmitOrder() : void {
      this.activeModal.close('Confirm');
    }

    private copyMaterialOrder(src: MaterialOrder) : MaterialOrder {
      let dest: MaterialOrder;

      let temp: MaterialSubOrder[] = [];

      src.materialSubOrderInfoList.forEach(subOrder => {
        temp.push(subOrder);
      })

      dest = Object.assign({}, src);

      dest.materialSubOrderInfoList = temp;

      return dest;
    }
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

  modalOptions: NgbModalOptions = {
    size: "lg"
  }

  open() {
    const modalRef = this.modalService.open(NgbdModalContent, this.modalOptions);
    this.newMaterialOrder = new MaterialOrder(this.orderId, Date.now());
    this.newMaterialOrder.modifyMode = true;
    modalRef.componentInstance.materialOrder = this.newMaterialOrder;

    modalRef.result.then(result => this.handleResult(result));
  }

  private handleResult(result: string) : void {
    if (result == 'Confirm') {
      this.materialOrderList.push(this.newMaterialOrder);
    }
  }
}