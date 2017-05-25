
import { Component } from "@angular/core";
import { OnInit, Input } from "@angular/core";

import { TreeService } from './../shared/tree/tree.service';
import { Stock, StockUpdateInfo } from './stock';
import { Leaf, Node } from './../shared/tree/tree';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { MaterialOrderService } from '../shared/material/material-order.service';
import { StockService } from './stock.service';
import { MaterialOrder } from '../shared/material/material-order';
import { OrderService } from './../orders/order.service';
import { Order } from './../orders/order';
import { Product } from './../orders/products/product';
import { ProductService } from './../orders/products/product.service';

@Component({
    selector: 'ngbd-modal-content',
    moduleId: module.id,
    templateUrl: "static/erp/src/app/stock/templates/stock.updatenode.html",
})
export class NgbdModalUpdateNodeContent implements OnInit {
    @Input() type: number;
    @Input() node_type: number;

    show_type: number;
    root_node: Node;
    choose_leaf: Leaf;
    choose_product: boolean;
    choose_product_stock_id: number;
    choose_product_id: number;
    materialOrderList: MaterialOrder[];
    orderList: Order[];
    productList: Product[];
    errorMessage: string;
    materialUpdateInfo: StockUpdateInfo;
    orderId: number;
    title: string;
    information: string;

    constructor(
        public activeModal: NgbActiveModal,
        private materialOrderService: MaterialOrderService,
        private materialStockService: StockService,
        private product_service: ProductService,
        private orderservice: OrderService,
        private treeService: TreeService) { }

    ngOnInit(): void {
        this.materialUpdateInfo = new StockUpdateInfo();
        this.show_type = 1;
        this.choose_product = false;
        if (this.type == 0 && this.node_type == 0) {
            this.show_type = 0;
            this.title = "原材料入库单";
            this.information = "请选择原材料订单";

            this.materialOrderService.getProcurementOrders().subscribe(
                orders => { this.materialOrderList = this.copyMaterialOrders(orders) },
                error => this.errorMessage = <any>error)
        }
        else if (this.type == 1 && this.node_type == 0) {
            this.title = "领料单";
            this.information = "请选择订单";

            this.orderservice.getOrders()
                .subscribe(orders => this.orderList = orders,
                error => this.errorMessage = <any>error);
        }
        else if (this.node_type == 1) {
            if (this.type == 0) {
                this.title = "产品入库";
                this.information = "请选择订单";
            }
            else {
                this.title = "产品出库";
                this.information = "请选择订单";
            }
            this.orderservice.getOrders()
                .subscribe(orders => this.orderList = orders,
                error => this.errorMessage = <any>error);
        }

        console.log(this.root_node);
    }

    onChooseLeaf(leaf: Leaf) {
        this.choose_leaf = leaf;
    }

    onChangePatchInfo(info: string) {
        this.materialUpdateInfo.additionalInfo = info;
    }

    onChangeOrder(order: any) {
        console.log(order);
        this.root_node = null;
        this.choose_product = false;
        this.orderId = order.id;
        this.productList = []
        if (this.type == 0 && this.node_type == 0) {
            this.treeService.getProcurementOrderMaterialTree(order.id).
                subscribe(materialTree => this.root_node = materialTree,
                error => this.errorMessage = <any>error);
        }
        else {
            this.product_service.getProducts(this.orderId)
                .subscribe(products => {
                    this.productList = this.copyProductList(products);
                },
                error => this.errorMessage = <any>error);
        }
    }

    onChangeSubProductOrder(product: Product) {
        this.choose_product_id = product.id;
        if (this.node_type == 0) {
            this.treeService.getSubProductMaterialTree(product.id).
                subscribe(materialTree => this.root_node = materialTree,
                error => this.errorMessage = <any>error);
        }
        else {
            this.choose_product = true;
            this.choose_product_stock_id = product.stockId;           
        }
    }

    copyMaterialOrders(src: MaterialOrder[]): MaterialOrder[] {
        let dest: MaterialOrder[] = [];

        src.forEach(materialOrder => {
            dest.push(materialOrder);
        });

        return dest;
    }
    onSubmit() {
        if (this.materialUpdateInfo.num != 0) {
            this.materialUpdateInfo.typeId = this.type;
            this.materialUpdateInfo.productType = this.node_type;
            this.materialUpdateInfo.price = 0;
            if (this.node_type == 0) {

                if (this.materialUpdateInfo.typeId == 0) {
                    this.materialUpdateInfo.procurementOrderId = this.orderId;
                }
                else {
                    this.materialUpdateInfo.saleOrderItemId = this.choose_product_id;
                }
                this.materialUpdateInfo.stockId = this.choose_leaf.id;
            }
            else {
                this.materialUpdateInfo.stockId = this.choose_product_stock_id;
                this.materialUpdateInfo.saleOrderItemId = this.choose_product_id;
            }

            this.materialStockService.updateMaterialStock(this.materialUpdateInfo).
                subscribe(materialUpdateInfoResult => {
                    console.log(materialUpdateInfoResult);
                    if (materialUpdateInfoResult.result == 0) {
                        let result = new NgbdModalUpdateNodeContent_Output();
                        result.type = this.type;
                        result.num = this.materialUpdateInfo.num;
                        if (this.node_type == 0){
                            result.leafId = this.choose_leaf.id;
                        }
                        else{
                             result.leafId = this.choose_product_stock_id;
                        }
                        this.activeModal.close(result);
                    }
                });
        }
    }

    private copyProductList(arraySrc: Product[]): Product[] {
        var arrayDest: Product[] = [];
        arraySrc.forEach((product) => arrayDest.push(Object.assign({}, product)));
        return arrayDest;
    }
}

export class  NgbdModalUpdateNodeContent_Output{
    leafId: number;
    type: number;
    num: number;
}
