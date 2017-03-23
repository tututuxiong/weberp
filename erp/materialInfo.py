import json

class MaterialBaseInfo:
    def __init__(self):
        self.unit = ''
        self.name = ''

    def setValue(self,name,unit):
        self.name = name
        self.unit = unit

    def __repr__(self):
        return repr((self.name, self.unit))

    def __hash__(self):
        return hash(self.name + self.unit)

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

class MaterialInfo:
    def __init__(self):
        self.count = 0
        self.materialBaseInfo = MaterialBaseInfo()

    def setValue(self,name,count,unit):
        self.count = count
        self.materialBaseInfo.name = name
        self.materialBaseInfo.unit = unit

    def __repr__(self):
        return repr((self.name,self.materialBaseInfo))

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)   

class SubProductMaterialInfo:
    count = 0

    def __init__(self):
        self.id = 0
        self.orderId = 0
        self.subProductname = ''
        self.detailList = {}

    def setFormalId(self,orderId,name):
        if self.id == 0:
            self.id = SubProductMaterialInfo.count + 1
            SubProductMaterialInfo.count = SubProductMaterialInfo.count + 1
        self.orderId = orderId
        self.subProductname = name

    def __repr__(self):
        return repr((self.id, self.orderId, self.subProductname, self.detailList))

    def addDetailInfo(self,mInfo):
        self.detailList[mInfo.materialBaseInfo] = mInfo.count

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
