export class Node{
    name: string;
    parentId: number;
}

export class Tree {
    subTrees: Tree[];
    nodes: Node[];
    name: string;
    parentId: number;
    id : number;
}
