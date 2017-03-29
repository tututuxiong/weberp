export class MaterialRequriment{
    name: string;
    count: number;
    unit: string;
}

export class Product {
    id: number;
    orderId: number;
    name: string;
    count: number;
    unit: string;
    price: number;
    total: number;
    comment: string;
    materialRequrimentList: MaterialRequriment[];

     constructor(source: Product) {
        this.id = source.id;
        this.name = source.name;
        this.orderId = source.orderId;
        this.count = source.count;
        this.unit = source.unit;
        this.price = source.price;
        this.total = source.total;
        this.comment = source.comment;
        this.materialRequrimentList = source.materialRequrimentList;
    }
}