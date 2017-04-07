export class Leaf{
    name: string;
    parentId: number;
}

export class Node {
    subNodes: Node[];
    leafs: Leaf[];
    name: string;
    parentId: number;
    id : number;
}
