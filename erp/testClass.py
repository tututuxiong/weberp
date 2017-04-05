import json

class Node:
    def __init__(self,name):
        self.name = name

class Tree:
    def __init__(self, name):
        self.name = name
        self.subTrees = []
        self.nodes = []

    def addNode(self, node):
        self.nodes.append(node)

    def addSubTree(self, subTree):
        self.subTrees.append(subTree)

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

