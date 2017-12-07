import json
from .tree import *
from .models import *
from .tree import *
import django.utils.timezone as timezone
from datetime import datetime


class StockUpdateInfo:
    def __init__(self):
        self.stockId = 0
        self.procurementOrderId = 0
        self.saleOrderItemId = 0
        self.additionalInfo = ""
        self.typeId = 0
        self.productType = 0
        self.price = 0
        self.num = 0
        self.result = 1

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

    def setJson2Class(self, dict_data):
        print(dict_data)
        for name, value in dict_data.items():
            if hasattr(self, name):
                setattr(self, name, value)


class StockInfo(Leaf):
    count = 0

    def __init__(self):
        self.id = 0
        self.internalId = ''
        self.instockNum = 0
        self.unit = ''
        self.parentId = ''
        self.name = ''
        self.shoppingNum = 0
        self.patchInfos = []

    def setValue(self, name, internalId, instockNum, unit, shoppingNum):
        self.name = name
        self.internalId = internalId
        self.instockNum = instockNum
        self.unit = unit
        self.shoppingNum = shoppingNum

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

    def __repr__(self):
        return repr((self.id, self.name, self.parentId, self.unit, self.instockNum, self.shoppingNum))


class StockInfoList:
    def __init__(self):
        self.count = 0
        self.stockInfoList = []

    def __repr__(self):
        return repr((self.count, self.stockInfoList))

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

    def addStockInfo(self, stockInfo):
        if stockInfo.id != 0:
            self.count = self.count + 1
            self.stockInfoList.append(stockInfo)
            return True
        else:
            return False


def getMaterialStockFromSql(material_id):
    try:
        material_sql = RawMat.objects.get(pk=material_id)
        materialStock = StockInfo()
        initMaterialLeafFromSqlData(materialStock, material_sql)

        return materialStock
    except RawMat.DoesNotExist:
        print("getMaterialStockFromSql Wront  material_id!!!")


def initMaterialLeafFromSqlData(materialStock, subNode_sql):
    materialStock.name = subNode_sql.name
    materialStock.unit = subNode_sql.unit
    materialStock.id = subNode_sql.id
    materialStock.parentId = subNode_sql.parent_id

    for CheckInRawMatItem_sql in CheckInRawMatRepoRecord.objects.filter(rawMaterial=subNode_sql):
        materialStock.instockNum += CheckInRawMatItem_sql.num
        if CheckInRawMatItem_sql.batch_nr != "":
            materialStock.patchInfos.append(CheckInRawMatItem_sql.batch_nr)

    for CheckOutRawMatItem_sql in CheckOutRawMatRepoRecord.objects.filter(rawMaterial=subNode_sql):
        materialStock.instockNum -= CheckOutRawMatItem_sql.num

    for CheckInProductItem_sql in CheckInProductRepoRecord.objects.filter(rawMaterial=subNode_sql):
        materialStock.instockNum += CheckInProductItem_sql.num

    for CheckOutProductItem_sql in CheckOutProductRepoRecord.objects.filter(rawMaterial=subNode_sql):
        materialStock.instockNum -= CheckOutProductItem_sql.num

    for RawMatOrderItem_sql in RawMatOrderItem.objects.filter(rawMat=subNode_sql):
        if RawMatOrderItem_sql.status == "BUYING":
            materialStock.shoppingNum += RawMatOrderItem_sql.num

def genarateTree(root_sql):
    root = Node(root_sql.name)
    root.id = root_sql.id
    if root_sql.rawmat_set.count():
        for subNode_sql in root_sql.rawmat_set.all():
            if subNode_sql.is_leaf == False:
                root.addSubNode(genarateTree(subNode_sql))
            else:
                leaf = StockInfo()
                initMaterialLeafFromSqlData(leaf, subNode_sql)
                root.addLeaf(leaf)
    return root


def genarateTreeWithNodeId(nodeIdList):
    return None


def getTree(name):
    try:
        root_sql = RawMat.objects.get(parent=None, name=name)
        return genarateTree(root_sql)
    except RawMat.DoesNotExist:
        print("no root node yet")
        return None


def initNodeBySqlInfo(node, node_sql):
    node.id = node_sql.id
    node.unit = node_sql.unit


def addNewMaterialLeaf(materialStock):
    try:
        parentNode_sql = RawMat.objects.get(pk=materialStock.parentId)
        node_sql = RawMat(parent=parentNode_sql, name=materialStock.name,
                          is_leaf=True, unit=materialStock.unit)
        node_sql.save()
        materialStock.id = node_sql.id
        return materialStock

    except RawMat.DoesNotExist:
        print("addNewMaterialLeaf Wront  rawMatOrderItem.rawMat_id !!!")


def addNewMaterialNode(node):
    try:
        parentNode_sql = RawMat.objects.get(pk=node.parentId)
        print(parentNode_sql)
        node_sql = RawMat(parent=parentNode_sql,
                          name=node.name, is_leaf=False, unit="")
        node_sql.save()
        node.id = node_sql.id
        return node

    except RawMat.DoesNotExist:
        print("addNewMaterialNode Wront  rawMatOrderItem.rawMat_id !!!")


def getNodeInfo(node_id):
    try:
        if node_id == 0:
            node_sql = RawMat.objects.get(parent=None)
        else:
            node_sql = RawMat.objects.get(pk=node_id)
        if node_sql.is_leaf == False:
            node = Node(node_sql.name)
            initNodeBySqlInfo(node, node_sql)

            for subNode_sql in node_sql.rawmat_set.all():
                if subNode_sql.is_leaf == False:
                    tmp_node = Node(subNode_sql.name)
                    initNodeBySqlInfo(tmp_node, subNode_sql)
                    tmp_node.parentId = node.id
                    node.addSubNode(tmp_node)
                else:
                    tmp_leaf = Leaf(subNode_sql.name)
                    initNodeBySqlInfo(tmp_leaf, subNode_sql)
                    tmp_leaf.parentId = node.id
                    node.addLeaf(tmp_leaf)

            return node

        else:
            leaf = Leaf(node_sql.name)
            leaf.id = node_sql.id
            leaf.parentId = node_sql.parent_id
            return leaf

    except RawMat.DoesNotExist:
        print("no root node yet")
        return None


def getProductTreeBysubProductId(id, tree_name):
    materialLeafList = findoutMaterialBysubProductId(id)
    return generateTreeByLeafs(materialLeafList, tree_name)


def getMaterialTreeBysubProductId(id, tree_name):
    materialLeafList = findoutMaterialBysubProductId(id)
    return generateTreeByLeafs(materialLeafList, tree_name)


def getTreeByMaterialOrderId(id, tree_name):
    materialLeafList = findoutMaterialByMaterialOrderId(id)
    return generateTreeByLeafs(materialLeafList, tree_name)


def findoutMaterialBysubProductId(id):
    materialLeafList = []
    salesItem_sql = SalesItem.objects.get(pk=id)
    for rawMatRequirement_sql in salesItem_sql.rawmatrequirement_set.all():
        isExist = False
        for leaf in materialLeafList:
            if leaf.id == rawMatRequirement_sql.rawMaterial_id:
                isExist = True
        if isExist == False:
            rawMatItem_sql = RawMat.objects.get(
                pk=rawMatRequirement_sql.rawMaterial_id)
            materalLeaf = StockInfo()
            initMaterialLeafFromSqlData(materalLeaf, rawMatItem_sql)
            materialLeafList.append(materalLeaf)
    return materialLeafList


def findoutMaterialByMaterialOrderId(id):
    materialLeafList = []
    for rawMatOrderItem_sql in RawMatOrder.objects.get(pk=id).rawmatorderitem_set.all():
        rawMatItem_sql = RawMat.objects.get(pk=rawMatOrderItem_sql.rawMat_id)
        materalLeaf = StockInfo()
        initMaterialLeafFromSqlData(materalLeaf, rawMatItem_sql)
        materialLeafList.append(materalLeaf)
    return materialLeafList


def generateTreeByLeafs(materialLeafList, tree_name):
    rootTreeSql = RawMat.objects.get(parent=None, name=tree_name)
    rootTree = Node("")
    rootTree.id = rootTreeSql.id
    rootTree.name = rootTreeSql.name

    for materialLeaf in materialLeafList:
        currentNode = materialLeaf
        while currentNode.parentId != rootTree.id:
            currentSql = RawMat.objects.get(pk=currentNode.parentId)
            newNode = Node(currentSql.name)
            newNode.id = currentSql.id
            newNode.parentId = currentSql.parent_id
            if currentNode.__class__.__name__ == "MaterialStockInfo":
                newNode.addLeaf(currentNode)
            else:
                newNode.addSubNode(currentNode)
            currentNode = newNode

        rootTree = mergeTree(rootTree, currentNode)
    return rootTree


def mergeTree(rootTree, targetTree):
    node = findNodeFromTree(rootTree, targetTree.parentId)
    node.addSubNode(targetTree)
    return rootTree


def findNodeFromTree(rootTree, id):
    if rootTree.id != id:
        if len(rootTree.subNodes) == 0:
            return None
        for node in rootTree.subNodes:
            resultNode = findNodeFromTree(node, id)
            if resultNode != None:
                return resultNode
            else:
                return None
    else:
        return rootTree


def updateMaterialInfo(materialUpdateInfo):
    material_sql = RawMat.objects.get(pk=materialUpdateInfo.stockId)
    if materialUpdateInfo.typeId == 0 and materialUpdateInfo.productType == 0:
        rawMatOrder_sql = RawMatOrder.objects.get(
            pk=materialUpdateInfo.procurementOrderId)
        newRecode = CheckInRawMatRepoRecord(
            rawMaterial=material_sql, rawMatOrderItem=rawMatOrder_sql,
            batch_nr=materialUpdateInfo.additionalInfo, num=materialUpdateInfo.num,
            act_total_price=materialUpdateInfo.price)
        newRecode.save()

    elif materialUpdateInfo.typeId == 1 and materialUpdateInfo.productType == 0:
        salesItem_sql = SalesItem.objects.get(
            pk=materialUpdateInfo.saleOrderItemId)
        newRecode = CheckOutRawMatRepoRecord(salesItem=salesItem_sql, rawMaterial=material_sql,
                                             batch_nr=materialUpdateInfo.additionalInfo, num=materialUpdateInfo.num)
        newRecode.save()
    elif materialUpdateInfo.productType == 1 and materialUpdateInfo.typeId == 0:
        salesItem_sql = SalesItem.objects.get(
            pk=materialUpdateInfo.saleOrderItemId)
        newRecode = CheckInProductRepoRecord(salesItem=salesItem_sql, rawMaterial=material_sql,
                                             batch_nr=materialUpdateInfo.additionalInfo, num=materialUpdateInfo.num)
        newRecode.save()

    elif materialUpdateInfo.productType == 1 and materialUpdateInfo.typeId == 1:
        salesItem_sql = SalesItem.objects.get(
            pk=materialUpdateInfo.saleOrderItemId)
        newRecode = CheckOutProductRepoRecord(salesItem=salesItem_sql, rawMaterial=material_sql,
                                              batch_nr=materialUpdateInfo.additionalInfo, num=materialUpdateInfo.num)
        newRecode.save()

    materialUpdateInfo.result = 0
