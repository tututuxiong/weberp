import { MaterialSubOrder } from './material-sub-order';

const statusList: string[] = ["新订单", "进行中", "已关闭"];

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

    constructor(parentOrderId: number) {
        this.id = -1;
        this.orderId = parentOrderId;
        this.name = 'New Material Order';
        this.date = '';
        this.price = 100;
        this.comment = '';
        this.status = this.getStatusList[0];
        this.subOrderCount = 0;
        this.materialSubOrderInfoList = [];
        this.modifyMode = false;
    }

    deserialize(jsonObj: MaterialOrder) {
        this.id = jsonObj.id;
        this.orderId = jsonObj.orderId;
        this.name = jsonObj.name;
        this.date = jsonObj.date;
        this.price = jsonObj.price;
        this.comment = jsonObj.comment;
        this.status = jsonObj.status;
        this.subOrderCount = jsonObj.subOrderCount;
        this.materialSubOrderInfoList = [];

        jsonObj.materialSubOrderInfoList.forEach(element => {
            let tmpMSO: MaterialSubOrder = new MaterialSubOrder(this.id);
            tmpMSO.deserialize(element);
            this.materialSubOrderInfoList.push(tmpMSO);
        });
    }

    getStatusList() : string[] {
        return statusList;
    }
}