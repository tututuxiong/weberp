import json
from .materialInfo import MaterialInfo, SubProductMaterialInfo, MaterialBaseInfo

class MaterialInfoList:
    def __init__(self):
        self.materialTitle = []
        self.materialUnitInfo = []
        self.materialInfoList = []
        self.materialItems = set()
        self.materialInStockInfo = []
        self.materialBuyingInfo = []

    def toJson(self):
        self.materialTitle.clear
        self.materialUnitInfo.clear
        self.genTotalData()
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

    def __repr__(self):
        return repr((self.materialTitle, self.materialUnitInfo))

    def addMaterialInfo(self, subProductmaterialInfo):
        self.materialInfoList.append(subProductmaterialInfo)
        for tmp_MaterialInfo in subProductmaterialInfo.detailList:
            self.materialItems.add(tmp_MaterialInfo)

    def addMaterialInStock(self, in_put):
        self.materialInStockInfo.append(in_put)

    def addMaterialBuying(self, in_put):
        self.materialBuyingInfo.append(in_put)

    def addMaterialTitle(self, in_put):
        self.materialTitle.append(in_put)

    def genTotalData(self):
        self.materialTitle.append('规格/名称')
        self.materialUnitInfo.append('单位')
        for tmp in self.materialItems:
            self.materialTitle.append(tmp.name)
            self.materialUnitInfo.append(tmp.unit)
