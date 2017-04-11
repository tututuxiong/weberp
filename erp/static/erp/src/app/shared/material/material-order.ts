import { MaterialSubOrder } from './material-sub-order';

export class MaterialOrder {
    id: number;
    orderId: number;
    name: string;
    date: number;
    price: number;
    comment: string;
    status: string;
    subOrderCount: number;
    materialSubOrderInfoList: MaterialSubOrder[];
    modifyMode: Boolean;

    constructor(parentOrderId: number, today: number) {
        this.id = -1;
        this.orderId = parentOrderId;
        this.name = 'New Material Order';
        this.date = today;
        this.price = 100;
        this.comment = '';
        this.status = 'new';
        this.subOrderCount = 0;
        this.materialSubOrderInfoList = [];
        this.modifyMode = false;
    }
}