import json
from .materialOrderInfo import MaterialSubOrderInfo, MaterialOrderInfo


class MaterialOrderInfoList:
    def __init__(self):
        self.count = 0
        self.materialOrderInfoList = []

    def __repr__(self):
        return repr((self.count, self.materialOrderInfoList))

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

    def addMaterialOrderInfo(self, materialOrderInfo):
        if materialOrderInfo.id != 0:
            self.count = self.count + 1
            self.materialOrderInfoList.append(materialOrderInfo)
            return True
        else:
            return False

    def updateMaterialOrderInfo(self, materialOrderInfo):
        isFind = False
        for index in range(len(self.materialOrderInfoList)):
            if self.materialOrderInfoList[index].id == materialOrderInfo.id:
                self.materialOrderInfoList[index] = materialOrderInfo
                isFind = True
        return isFind

    def removeMaterialOrderInfo(self, id):
        isFind = False
        for materialOrder_iter in self.materialOrderInfoList:
            if materialOrder_iter.id == id:
                self.materialOrderInfoList.remove(materialOrder_iter)
                self.count = self.count - 1
                isFind = True
        return isFind

    def getMaterialOrderInfo(self, id):
        isFind = False
        for materialOrder_iter in self.materialOrderInfoList:
            if materialOrder_iter.id == id:
                isFind = True
                return materialOrder_iter
        if isFind != True:
            return None        
        