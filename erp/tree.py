import json

class Leaf:
    def __init__(self,name):
        self.name = name
        self.parentId = 0

class Node:
    count = 0
    def __init__(self, name):
        self.name = name
        self.subNodes = []
        self.leafs = []
        self.id = Node.count + 1
        Node.count = Node.count + 1

    def addLeaf(self, leaf):
        self.leafs.append(leaf)
        leaf.parentId = self.id

    def addSubNode(self, subNode):
        self.subNodes.append(subNode)
        subNode.parentId = self.id

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
