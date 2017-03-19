class SubProductMaterialInfo:
    def __init__(self, pid, orderId, subProductMaterialId, name):
        self.id = pid
        self.orderId = orderId
        self.subProductMaterialId = subProductMaterialId
        self.name = name
        self.detailList = []

    def  __repr__(self):
         return repr((self.id,self.orderId,self.subProductMaterialId,self.name,self.detailList))

    def addDetailInfo(self, count):
        self.detailList.append(count)
