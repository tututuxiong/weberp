export class Product {
    id: number;
    name: string;
    count: number;
    unit: string;
    price: number;
    total: number;
    comment: string;

    constructor(source: Product) {
        this.id = source.id;
        this.name = source.name;
        this.count = source.count;
        this.unit = source.unit;
        this.price = source.price;
        this.total = source.total;
        this.comment = source.comment;
    }
}