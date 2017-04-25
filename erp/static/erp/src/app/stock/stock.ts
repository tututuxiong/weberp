
export class Stock {
    id: number;
    name: string;
    internalId: number;
    unit: string;
    instockNum: number;
    shoppingNum: number;
}

export class StockUpdateInfo {
    materialId: number
    procurementOrderId: number
    saleOrderItemId: number
    additionalInfo: string;
    typeId: number
    price: number
    result: number
    num: number
}