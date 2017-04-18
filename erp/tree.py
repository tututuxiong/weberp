import json
from .models import *

class Leaf:
    def __init__(self,name):
        self.id = 0
        self.name = name
        self.parentId = 0

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

    def setJson2Class(self, dict_data):
        for name, value in dict_data.items():
            if hasattr(self, name):
                setattr(self, name, value)
class Node:
    count = 0
    def __init__(self, name):
        self.name = name
        self.subNodes = []
        self.leafs = []
        self.parentId = 0
        self.id = Node.count + 1
        Node.count = Node.count + 1

    def addLeaf(self, leaf):
        if (leaf != None):
            self.leafs.append(leaf)
            leaf.parentId = self.id

    def addSubNode(self, subNode):
        if (subNode != None):
            self.subNodes.append(subNode)
            subNode.parentId = self.id

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

    def setJson2Class(self, dict_data):
        for name, value in dict_data.items():
            if hasattr(self, name):
                setattr(self, name, value)

def addNewNode(node):
    try:
        parentNode_sql = RawMat.objects.get(pk=node.parentId)
        print(parentNode_sql)
        node_sql = RawMat(parent=parentNode_sql,name=node.name,is_leaf=False,unit="")
        #node_sql.save()
        node.id = node_sql.id
        return node

    except RawMat.DoesNotExist:
        print("addNewNode Wront  rawMatOrderItem.rawMat_id !!!")                
        


                