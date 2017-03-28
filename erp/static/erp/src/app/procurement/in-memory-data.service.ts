import { InMemoryDbService } from 'angular-in-memory-web-api';
import { MaterialOrder } from '../shared/material/material-order';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let MaterialOrders: MaterialOrder[] = [
            {id: 1, orderId: 1, name: 'materialOrder1', date: '2017-3-27', price: 20000, comment: '', status: 'open', subOrderCount: 1, materialSubOrderInfoList: [{id: 1, materialOrderId: 1, name: '拉链', num: 100, unit:'个', unit_price:100, total_price: 10000, comment: 'xxxxxxx'}], modifyMode: false},
            {id: 2, orderId: 1, name: 'materialOrder2', date: '2017-3-27', price: 20000, comment: '', status: 'open', subOrderCount: 1, materialSubOrderInfoList: [{id: 2, materialOrderId: 1, name: '拉链', num: 100, unit:'个', unit_price:100, total_price: 10000, comment: 'xxxxxxx'}], modifyMode: false},
            {id: 3, orderId: 1, name: 'materialOrder3', date: '2017-3-27', price: 20000, comment: '', status: 'open', subOrderCount: 1, materialSubOrderInfoList: [{id: 3, materialOrderId: 1, name: '拉链', num: 100, unit:'个', unit_price:100, total_price: 10000, comment: 'xxxxxxx'}], modifyMode: false},
            {id: 4, orderId: 2, name: 'materialOrder4', date: '2017-3-27', price: 20000, comment: '', status: 'open', subOrderCount: 1, materialSubOrderInfoList: [{id: 4, materialOrderId: 2, name: '拉链', num: 100, unit:'个', unit_price:100, total_price: 10000, comment: 'xxxxxxx'}], modifyMode: false},
            {id: 5, orderId: 2, name: 'materialOrder5', date: '2017-3-27', price: 20000, comment: '', status: 'open', subOrderCount: 1, materialSubOrderInfoList: [{id: 5, materialOrderId: 2, name: '拉链', num: 100, unit:'个', unit_price:100, total_price: 10000, comment: 'xxxxxxx'}], modifyMode: false},
            {id: 6, orderId: 3, name: 'materialOrder6', date: '2017-3-27', price: 20000, comment: '', status: 'open', subOrderCount: 1, materialSubOrderInfoList: [{id: 6, materialOrderId: 3, name: '拉链', num: 100, unit:'个', unit_price:100, total_price: 10000, comment: 'xxxxxxx'}], modifyMode: false},
            {id: 7, orderId: 3, name: 'materialOrder7', date: '2017-3-27', price: 20000, comment: '', status: 'open', subOrderCount: 1, materialSubOrderInfoList: [{id: 7, materialOrderId: 3, name: '拉链', num: 100, unit:'个', unit_price:100, total_price: 10000, comment: 'xxxxxxx'}], modifyMode: false},
            {id: 8, orderId: 3, name: 'materialOrder8', date: '2017-3-27', price: 20000, comment: '', status: 'open', subOrderCount: 1, materialSubOrderInfoList: [{id: 8, materialOrderId: 3, name: '拉链', num: 100, unit:'个', unit_price:100, total_price: 10000, comment: 'xxxxxxx'}], modifyMode: false}
        ];

        return {MaterialOrders};
    }
}