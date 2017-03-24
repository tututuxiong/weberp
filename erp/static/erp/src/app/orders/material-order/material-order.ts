export class MaterialSubOrder {
    id: number;
    parentId: number;
    name: string;
    count: number;
    unit: string;
    unit_price: number;
    total_price: number;
    comment: string
}

export class MaterialOrder {
    id: number;
    name: string;
    date: string;
    price: number;
    comment: string;
    status: string;
    childrenCount: number;
    childrenList: MaterialOrder[];
}