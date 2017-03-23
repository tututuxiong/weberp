import json
from .materialOrderInfo import MaterialSubOrderInfo, MaterialOrderInfo


class MaterialOrderInfoList:
    def __init__(self):
        self.count = 0
        self.materialOrderInfoList = []

    def addMaterialOrderInfo(self, materialOrderInfo):
        self.count = self.count + 1
        self.materialOrderInfoList.append(materialOrderInfo)

    def __repr__(self):
        return repr((self.count, self.materialOrderInfoList))

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
