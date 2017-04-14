export class Leaf{
    name: string;
    parentId: number;
    id: number;
}

export class LeafUpdate{
    id: number;
    count: number;
    type:number; // 0 +, 1 -
}


export class Node {
    subNodes: Node[];
    leafs: Leaf[];
    name: string;
    parentId: number;
    id : number;
}
