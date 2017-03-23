import json

class MaterialInfo:
    count = 0
    def __init__(self):
        self.id = 0
        self.count = 0
        self.name = ''
        self.unit = ''

    def setValue(self,name,count,unit):
        self.count = count
        self.name = name
        self.unit = unit

    def __repr__(self):
        return repr((self.id, self.name, self.count, unit))

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)   

    def setFormalId(self,orderId,subProductId):
        if self.id == 0:
            self.id = MaterialInfo.count + 1
            MaterialInfo.count = MaterialInfo.count + 1

    def setJson2Class(self, dict_data):
        for name, value in dict_data.items():
            if hasattr(self, name):
                setattr(self, name, value)

class SubProductMaterialInfo:
    count = 0

    def __init__(self):
        self.id = 0
        self.orderId = 0
        self.subProductId = 0
        self.detailList = []

    def setFormalId(self,orderId,subProductId):
        if self.id == 0:
            self.id = SubProductMaterialInfo.count + 1
            SubProductMaterialInfo.count = SubProductMaterialInfo.count + 1
        self.subProductId = subProductId
        self.orderId = orderId

    def __repr__(self):
        return repr((self.id, self.orderId, self.subProductId, self.detailList))

    def addDetailInfo(self,mInfo):
        self.detailList.append(mInfo)

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

    def setJson2Class(self, dict_data):
        for name, value in dict_data.items():
            if hasattr(self, name):
                setattr(self, name, value)