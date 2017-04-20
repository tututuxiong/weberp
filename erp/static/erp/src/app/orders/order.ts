export enum OrderStatus {Open = 0, Ongoing, Closed};

export class Order {
    id: number;
    name: string;
    date: string;
    desc: string;
    price: number;
    sales: string;
    comment: string;
    status: OrderStatus;
    deliveryStatus: string;
    intenalId: number;
    materialStatus: string;

    constructor() {
        this.id = -1;
    }
}