import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { Order, OrderStatus } from './order';
import { OrderService } from "./order.service";
import { Product } from './products/product';
import { ProductService } from './products/product.service';

import { MaterialOrder } from './material-order/material-order';
import { MaterialOrderService } from './material-order/material-order.service';
import { DetailMaterialRequriment } from './detail-material/detail-material'

import { MaterialStockService } from './../materialStock/materialStock.service';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
    //selector is not needed here because we use routing.
    //selector: 'order-detail',
    moduleId: module.id,
    templateUrl: "./templates/order-detail.component.html"
})

export class OrderDetailComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,  //Inject ActivatedRoute to pull params from routing
        private router: Router,
        private order_service: OrderService,
        private product_service: ProductService,
        private material_order_service: MaterialOrderService,
        private material_stock_service: MaterialStockService,
    ) { }

    title: string; //Initialization must be put in ngOnInit; otherwise there is no effect. Don't know why.

    orderDetail: Order;

    productList: Product[];
    materialItemList: DetailMaterialRequriment[];
    productListBeforeEdit: Product[];

    addedProductList: Product[];
    deletedProductList: Product[];

    productListEditable: Boolean;
    errorMessage: string;

    materialOrderList: MaterialOrder[];

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.order_service.getOrder(+params['id']))
            .subscribe((order: Order) => {
                this.orderDetail = order;
                this.product_service.getProducts(this.orderDetail.id)
                    .subscribe(products => {
                        this.productList = this.copyProductList(products);
                        this.updateDetailmaterialItemInfo();
                    },
                    error => this.errorMessage = <any>error);

                this.material_order_service.getMaterialOrders(this.orderDetail.id)
                    .subscribe(materialOrders => this.materialOrderList = this.copyMaterialOrders(materialOrders),
                    error => this.errorMessage = <any>error,
                );
            });

        this.title = 'Order Detail';    //Initialize title attribute here!!!
        this.productListEditable = false;
        this.productListBeforeEdit = [];
        this.addedProductList = [];
        this.deletedProductList = [];
    }

    private onEditProducts(): void {

        if (!this.productListEditable) {
            this.productListBeforeEdit = this.copyProductList(this.productList);
        }

        this.productListEditable = !this.productListEditable;
    }

    private onSubmitEdit(): void {

        this.productListEditable = !this.productListEditable;

        this.addedProductList.forEach(newProduct => {
            // let result: Product;
            this.product_service.addProducts(newProduct)
                .subscribe(product => newProduct = Object.assign({}, product),
                error => this.errorMessage = <any>error);
        })

        this.addedProductList = [];

        this.deletedProductList.forEach(delProduct => {
            let result: string;
            this.product_service.delProducts(delProduct)
                .subscribe(message => {result = message;
                this.updateDetailmaterialItemInfo();},
                error => this.errorMessage = <any>error);
        })

        this.deletedProductList = [];

        this.getUpdatedProducts().forEach(chgProduct => {
            // let result: Product;
            this.product_service.updateProducts(chgProduct)
                .subscribe(product => chgProduct = Object.assign({}, product),
                error => this.errorMessage = <any>error);
        })
    }

    private onCancelEdit(): void {
        this.productList = this.copyProductList(this.productListBeforeEdit);
        this.addedProductList = [];
        this.deletedProductList = [];
        this.productListEditable = !this.productListEditable;
    }

    private copyProductList(arraySrc: Product[]): Product[] {
        var arrayDest: Product[] = [];
        arraySrc.forEach((product) => arrayDest.push(Object.assign({}, product)));
        return arrayDest;
    }

    private copyMaterialOrders(arraySrc: MaterialOrder[]): MaterialOrder[] {
        var arrayDest: MaterialOrder[] = [];
        arraySrc.forEach((materialOrder) => arrayDest.push(Object.assign({}, materialOrder)));
        return arrayDest;
    }

    private getUpdatedProducts(): Product[] {
        let updatedProductList: Product[] = [];

        this.productListBeforeEdit.forEach(product_b => {
            this.productList.forEach(product_a => {
                if (product_a.id == product_b.id) {
                    if (!this.jsonEqual(product_a, product_b)) {
                        updatedProductList.push(product_a);
                    }
                }
            })
        })

        return updatedProductList;
    }

    private jsonEqual(product_a: Product, product_b: Product): Boolean {
        return JSON.stringify(product_a) == JSON.stringify(product_b);
    }

    private updateDetailmaterialItemInfo() {
        this.updatematerialItemList();
        this.materialItemList.forEach(meterialItem => {
            /*删除单位*/
            var name = meterialItem.name.substring(0, meterialItem.name.indexOf('/'));
            console.log(name);
            this.material_stock_service.getMaterialStockByName(name).
                subscribe(material_stock => {
                    meterialItem.shoppingNum = material_stock.shoppingNum;
                    meterialItem.instockNum = material_stock.instockNum;
                })
        })
    }

    private updatematerialItemList() {
        this.materialItemList = [];
        var isExist: Boolean;

        this.productList.forEach(product_iter => {
            for (var k in product_iter.materialList) {
                isExist = false;
                for (var m in this.materialItemList) {
                    if (k == this.materialItemList[m].name) {
                        this.materialItemList[m].requrimentNum += product_iter.materialList[k];
                        isExist = true;
                    }
                }

                if (isExist == false) {
                    var tmp_materialitem = new DetailMaterialRequriment;
                    tmp_materialitem.name = k;
                    tmp_materialitem.requrimentNum = product_iter.materialList[k];
                    this.materialItemList.push(tmp_materialitem);
                }
            }
        })
    }

}
