export class MaterialSubOrder {
    id: number;
    materialOrderId: number;
    name: string;
    num: number;
    unit: string;
    unit_price: number;
    total_price: number;
    comment: string
}

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
}