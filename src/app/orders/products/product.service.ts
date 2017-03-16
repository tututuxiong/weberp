import { Injectable } from "@angular/core";

import { Product } from './product';
import { PRODUCTS } from './mock-products';

@Injectable()
export class ProductService {
    getProducts(): Promise<Product[]> {
        return Promise.resolve(PRODUCTS);
    }

    getProduct(id: number): Promise<Product> {
        return this.getProducts().then(products => products.find(product => product.id === +id));
    }
}