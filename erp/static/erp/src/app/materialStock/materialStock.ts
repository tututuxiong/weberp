
export class MaterialStock {
    id: number;
    name: string;
    internalId: number;
    unit: string;
    instockNum: number;
    shoppingNum: number;
}

export class MaterialUpdateInfo {
    materialId: number
    procurementOrderId: number
    saleOrderId: number
    additionalInfo: string;
    typeId: number
    price: number
    result: number
    num: number
}