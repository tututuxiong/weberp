
export class Stock {
    id: number;
    name: string;
    internalId: number;
    unit: string;
    instockNum: number;
    shoppingNum: number;
}

export class StockUpdateInfo {
    stockId: number
    procurementOrderId: number
    saleOrderItemId: number
    additionalInfo: string;
    typeId: number
    productType: number
    price: number
    result: number
    num: number
}