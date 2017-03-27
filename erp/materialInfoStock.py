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