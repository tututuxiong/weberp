import json

class Node:
    def __init__(self,name):
        self.name = name
        self.parentId = 0

class Tree:
    count = 0
    def __init__(self, name):
        self.name = name
        self.subTrees = []
        self.nodes = []
        self.id = Tree.count + 1
        Tree.count = Tree.count + 1

    def addNode(self, node):
        self.nodes.append(node)
        node.parentId = self.id

    def addSubTree(self, subTree):
        self.subTrees.append(subTree)
        subTree.parentId = self.id

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

