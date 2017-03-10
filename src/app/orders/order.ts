export enum OrderStatus {Open = 0, Ongoing, Closed};

export class Order {
    id: number;
    name: string;
    date: string;
    status: OrderStatus;
    
}