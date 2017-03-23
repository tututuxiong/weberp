import json
from .materialInfo import MaterialInfo


class MaterialInfoList:
    def __init__(self):
        self.materialInfoList = []
        self.materialTitle = []
        addMaterialUnit('单位')
        self.materialUnitInfo = []
        self.materialInStockInfo = []
        addMaterialInStock('在库可用')
        self.materialBuyingInfo = []
        addMaterialBuying('采购中(未到库)')

    def __repr__(self):
        return repr((self.materialInfoList, self.materialTitle, self.materialUnitInfo, self.materialInStockInfo, self.materialBuyingInfo))

    def addMaterialInfo(self, materialInfo):
        self.materialInfoList.append(materialInfo)

    def addMaterialUnit(self, in_put):
        self.materialUnitInfo.append(in_put)

    def addMaterialInStock(self, in_put):
        self.materialInStockInfo.append(in_put)

    def addMaterialBuying(self, in_put):
        self.materialBuyingInfo.append(in_put)

    def addMaterialTitle(self, in_put):
        self.materialTitle.append(in_put)

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
