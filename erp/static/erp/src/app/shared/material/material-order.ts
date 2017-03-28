import { MaterialSubOrder } from './material-sub-order';

export class MaterialOrder {
    id: number;
    orderId: number;
    name: string;
    date: string;
    price: number;
    comment: string;
    status: string;
    subOrderCount: number;
    materialSubOrderInfoList: MaterialSubOrder[];
    modifyMode: Boolean;
}