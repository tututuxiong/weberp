export class Leaf{
    name: string;
    parentId: number;
    id: number;
    unit: string;
}


export class Node {
    subNodes: Node[];
    leafs: Leaf[];
    name: string;
    parentId: number;
    id : number;
    unit: string;
}
