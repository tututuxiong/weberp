const statusList: string[] = ["新订单", "进行中", "已关闭"];

export class MaterialSubOrder {
    id: number;
    materialOrderId: number;
    materialId: number;
    name: string;
    num: number;
    unit: string;
    unit_price: number;
    total_price: number;
    comment: string;
    status: number;

    constructor(parentId: number) {
        this.id = -1;
        this.materialOrderId = parentId;
        this.materialId = -1;
        this.name = '新原料';
        this.num = 100;
        this.unit = '个';
        this.unit_price = 100;
        this.total_price = 100;
        this.comment = 'xxx';
        this.status = this.getStatusList[0];
    }

    deserialize(jsonObj: MaterialSubOrder) {
        this.id = jsonObj.id;
        this.materialId = jsonObj.materialId;
        this.name = jsonObj.name;
        this.num = jsonObj.num;
        this.unit = jsonObj.unit;
        this.unit_price = jsonObj.unit_price;
        this.total_price = jsonObj.total_price;
        this.comment = jsonObj.comment;
        this.status = jsonObj.status;
    }

    getStatusList() : string[] {
        return statusList;
    }
}