// export enum OrderStatus {Open = 0, Ongoing, Closed};
const orderStatusList: string[] = ["新订单", "进行中", "已关闭"];

export class Order {
    id: number;
    name: string;
    date: string;
    desc: string;
    price: number;
    sales: string;
    comment: string;
    // status: OrderStatus;
    status: string;
    deliveryStatus: string;
    intenalId: number;
    materialStatus: string;

    constructor() {
        this.id = -1;

        this.name = "新的订单";
        this.date = "";
        this.desc = "我的订单";
        this.price = 0;
        this.sales = "张三";
        this.comment = "无";
        this.deliveryStatus = "";
        this.intenalId = 0;
        this.materialStatus = "";
        this.status = this.getStatusList[0];
    }

    public getStatusList() : string[] {
        return orderStatusList;
    }

    deserialize(jsonObj: Order) {
        this.id = jsonObj.id;
        this.name = jsonObj.name;
        this.date = jsonObj.date;
        this.desc = jsonObj.desc;
        this.price = jsonObj.price;
        this.sales = jsonObj.sales;
        this.comment = jsonObj.comment;
        this.deliveryStatus = jsonObj.deliveryStatus;
        this.intenalId = jsonObj.intenalId;
        this.materialStatus = jsonObj.materialStatus;
        this.status = jsonObj.status;
    }
}