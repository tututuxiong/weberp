export class MaterialRequriment{
    name: string;
    count: number;
    unit: string;
    id: number;
    materialId: number;
}

export class Product {
    id: number;
    stockId: number;
    orderId: number;
    name: string;
    count: number;
    unit: string;
    price: number;
    comment: string;
    pathInfo: string;
    materialRequrimentList: MaterialRequriment[];

     constructor(source: Product) {
        this.id = source.id;
        this.name = source.name;
        this.stockId = source.stockId;
        this.orderId = source.orderId;
        this.count = source.count;
        this.unit = source.unit;
        this.price = source.price;
        this.pathInfo = source.pathInfo;
        this.comment = source.comment;
        this.materialRequrimentList = source.materialRequrimentList;
    }
}