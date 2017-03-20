import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { Order, OrderStatus } from './order';
import { OrderService } from "./order.service";
import { Product } from './products/product';
import { ProductService } from './products/product.service';

import 'rxjs/add/operator/switchMap';

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
        private product_service: ProductService
    ) {}

    title: string; //Initialization must be put in ngOnInit; otherwise there is no effect. Don't know why.

    orderDetail: Order;

    productList: Product[];
    productListBeforeEdit: Product[];

    addedProductList: Product[];
    deletedProductList: Product[];

    productListEditable: Boolean;
    errorMessage: string;

    ngOnInit() : void {
        this.route.params
        .switchMap((params: Params) => this.order_service.getOrder(+params['id']))
        .subscribe((order: Order) => {
            this.orderDetail = order;
            this.product_service.getProducts(this.orderDetail.id)
                .subscribe(products => this.productList = this.copyProductList(products),
                          error => this.errorMessage = <any>error);
        });

        this.title = 'Order Detail';    //Initialize title attribute here!!!
        this.productListEditable = false;
        this.productListBeforeEdit = [];
        this.addedProductList = [];
        this.deletedProductList = [];
    }

    private onEditProducts() : void {
  
        if (!this.productListEditable) {
            this.productListBeforeEdit = this.copyProductList(this.productList);
        }
        
        this.productListEditable = !this.productListEditable;
    }

    private onSubmitEdit() : void {

        this.productListEditable = !this.productListEditable;

        console.log(this.addedProductList);
        console.log(this.deletedProductList);
        console.log(this.getUpdatedProducts());
    }

    private onCancelEdit() : void {
        this.productList = this.copyProductList(this.productListBeforeEdit);
        this.addedProductList = [];
        this.deletedProductList = [];
        this.productListEditable = !this.productListEditable;
    }

    private copyProductList(arraySrc: Product[]) : Product[] {
        var arrayDest : Product[] = [];
        arraySrc.forEach((product) => arrayDest.push(Object.assign({}, product)));
        return arrayDest;
    }

    private getUpdatedProducts() : Product[] {
        let updatedProductList: Product[] = [];


        this.productListBeforeEdit.forEach(product_b => {
            this.productList.forEach(product_a => {
                if (product_a.id == product_b.id) {
                    if (product_a != product_b) {
                        updatedProductList.push(product_a);
                    }
                }
            })
        })

        return updatedProductList;
    }
}
