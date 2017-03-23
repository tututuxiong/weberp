class SubProductMaterialInfo:
    count = 0

    def __init__(self):
        self.id = 0
        self.orderId = 0
        self.subProductMaterialId = ''
        self.name = ''
        self.detailList = []

    def setFormalId(self, orderId):
        if self.id == 0:
            self.id = SubProductMaterialInfo.count + 1
            SubProductMaterialInfo.count = SubProductMaterialInfo.count + 1
        self.orderId = orderId

    def setValue(self, subProductMaterialId, name):
        self.subProductMaterialId = subProductMaterialId
        self.name = name

    def __repr__(self):
        return repr((self.id, self.orderId, self.subProductMaterialId, self.name, self.detailList))

    def addDetailInfo(self, count):
        self.detailList.append(count)
