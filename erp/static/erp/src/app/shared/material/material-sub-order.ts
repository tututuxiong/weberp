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

    constructor(parentId: number) {
        this.id = -1;
        this.materialId = -1;
        this.materialOrderId = parentId;
        this.name = '新原料';
        this.num = 100;
        this.unit = '个';
        this.unit_price = 100;
        this.total_price = 100;
        this.comment = 'xxx';
    }
}