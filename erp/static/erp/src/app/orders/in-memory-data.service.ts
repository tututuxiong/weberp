import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let  Orders = [
    { id: 1, name: 'example order 1', date: '2017-03-06', desc: 'xxx', price: 200, sales: 'xxx', comment: 'xxx', status: "新订单"},
    { id: 2, name: 'example order 2', date: '2017-03-06', desc: 'xxx', price: 200, sales: 'xxx', comment: 'xxx', status: "新订单"},
    { id: 3, name: 'example order 3', date: '2017-03-06', desc: 'xxx', price: 200, sales: 'xxx', comment: 'xxx', status: "新订单"},
    { id: 4, name: 'example order 4', date: '2017-03-06', desc: 'xxx', price: 200, sales: 'xxx', comment: 'xxx', status: "新订单"},
    { id: 5, name: 'example order 5', date: '2017-03-06', desc: 'xxx', price: 200, sales: 'xxx', comment: 'xxx', status: "新订单"},
    { id: 6, name: 'example order 6', date: '2017-03-06', desc: 'xxx', price: 200, sales: 'xxx', comment: 'xxx', status: "新订单"},
];
    return {Orders};
  }
}