import { Component, Input, OnInit } from '@angular/core';

import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { MaterialOrder } from './material-order';
import { MaterialSubOrder } from './material-sub-order';

import { MaterialOrderService } from './material-order.service';

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
      this.materialOrderOld = new MaterialOrder(0);
      this.copyMaterialOrder(this.materialOrderOld, this.materialOrder);
    }

    constructor(public activeModal: NgbActiveModal,
                private materialService: MaterialOrderService) {

    }

    onSubmit() : void {
        this.materialOrder.modifyMode = false;
    }

    onAbort() : void {
      this.copyMaterialOrder(this.materialOrder, this.materialOrderOld);
      this.materialOrder.modifyMode = false;
    }

    onModify() : void {
      this.materialOrder.modifyMode = true;
      this.copyMaterialOrder(this.materialOrderOld, this.materialOrder);
    }

    onSubmitOrder() : void {
      this.materialService.addMaterialOrder(this.materialOrder).subscribe(mo => {
        // this.copyMaterialOrder(this.materialOrder, mo);
        // console.log(this.materialOrder);

        this.materialOrder.deserialize(mo);

        this.materialOrder.modifyMode = false;
        this.activeModal.close('Confirm');
      });
      
    }

    private copyMaterialOrder(dest: MaterialOrder, src: MaterialOrder) : MaterialOrder {
      // let dest: MaterialOrder;

      let temp: MaterialSubOrder[] = [];

      src.materialSubOrderInfoList.forEach(subOrder => {
        temp.push(subOrder);
      })

      dest.comment = src.comment;
      dest.date = src.date;
      dest.name = src.name;
      dest.orderId = src.orderId;
      dest.price = src.price;
      dest.status = src.status;
      dest.id = src.id;

      // dest = Object.assign({}, src);

      // console.log(src.id);
      // console.log(dest.id);

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
    size: "lg",
    // windowClass: "my-modal"
  }

  open() {
    const modalRef = this.modalService.open(NgbdModalContent, this.modalOptions);
    this.newMaterialOrder = new MaterialOrder(this.orderId);
    this.newMaterialOrder.modifyMode = true;
    modalRef.componentInstance.materialOrder = this.newMaterialOrder;

    modalRef.result.then((result) => this.handleResult(result), (reason) => console.log("Dismissed!"));
  }

  private handleResult(result: string) : void {
    if (result == 'Confirm') {
      console.log(this.newMaterialOrder);
      this.materialOrderList.push(this.newMaterialOrder);
    }
  }
}