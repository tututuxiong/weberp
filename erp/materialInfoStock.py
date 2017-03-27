import json

class MaterialStockInfo:
    count = 0

    def __init__(self):
        self.id = 0
        self.name = ''
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
        