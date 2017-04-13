import json
from .tree import *
from .models import *
from .tree import *

class MaterialStockInfo(Leaf):
    count = 0

    def __init__(self):
        self.id = 0
        self.internalId = ''
        self.instockNum = 0
        self.unit = ''
        self.shoppingNum = 0

    def setFormalId(self):
        if self.id == 0:
            self.id = MaterialStockInfo.count + 1
            MaterialStockInfo.count = MaterialStockInfo.count + 1

    def setValue(self, name, internalId, instockNum, unit, shoppingNum):
        self.name = name
        self.internalId = internalId
        self.instockNum = instockNum
        self.unit = unit
        self.shoppingNum = shoppingNum

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

class MaterialStockInfoList:
    def __init__(self):
        self.count = 0
        self.materialStockInfoList = []

    def __repr__(self):
        return repr((self.count, self.materialStockInfoList))

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

    def addMaterialStockInfo(self, materialStockInfo):
        if materialStockInfo.id != 0:
            self.count = self.count + 1
            self.materialStockInfoList.append(materialStockInfo)
            return True
        else:
            return False

def getMaterialStockFromSql(material_id):
    try:
        material_sql = RawMat.objects.get(pk = material_id)
        materialStock = MaterialStockInfo()
        materialStock.id = material_sql.id
        materialStock.name = material_sql.name
        materialStock.unit = material_sql.unit
        return materialStock
    except RawMat.DoesNotExist:
        print("getMaterialStockFromSql Wront  material_id!!!")



def genarateTree(root_sql):
    if (root_sql.rawmat_set.count()):
        root = Node(root_sql.name)
        root.id = root_sql.id
        for subNode_sql in root_sql.rawmat_set.all():
            if (subNode_sql.is_leaf == False):
                root.addSubNode(genarateTree(subNode_sql))
            else:
                leaf = Leaf(subNode_sql.name)
                leaf.id = subNode_sql.id
                root.addLeaf(leaf)
        return root
    else:
        return None

def getTree():
    try:
        root_sql = RawMat.objects.get(parent=None)
        return genarateTree(root_sql)
    except RawMat.DoesNotExist:
        print("no root node yet")
        return None
