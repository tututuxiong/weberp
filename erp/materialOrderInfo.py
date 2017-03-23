class MaterialSubOrderInfo:
    count = 0

    def __init__(self):
        self.id = 0
        self.materialOrderId = 0
        self.name = ''
        self.num = 0
        self.unit = ''
        self.unit_price = 0
        self.total_price = 0
        self.comment = ''

    def setFormalId(self, materialOrderId):
        if self.id == 0:
            self.id = MaterialSubOrderInfo.count + 1
            MaterialSubOrderInfo.count = MaterialSubOrderInfo.count + 1
        self.materialOrderId = materialOrderId

    def setValue(self, name, num, unit, unit_price, comment):
        self.name = name
        self.num = num
        self.unit = unit
        self.unit_price = unit_price
        self.total_price = num * unit_price
        self.comment = comment

    def __repr__(self):
        return repr((self.id, self.materialOrderId, self.name, self.num, self.unit, self.unit_price, self.total_price, self.comment))


class MaterialOrderInfo:
    count = 0

    def __init__(self):
        self.id = 0
        self.name = ''
        self.date = ''
        self.price = 0
        self.comment = ''
        self.status = ''
        self.subOrderCount = 0
        self.materialSubOrderInfoList = []

    def setFormalId(self):
        if self.id == 0:
            self.id = MaterialOrderInfo.count + 1
            MaterialOrderInfo.count = MaterialOrderInfo.count + 1

    def setValue(self, name, date, comment, orderStatus):
        self.name = name
        self.date = date
        self.comment = comment
        self.status = orderStatus

    def addMaterialSubOrder(self, materialSubOrderInfo):
        self.subOrderCount = self.subOrderCount + 1
        self.materialSubOrderInfoList.append(materialSubOrderInfo)

    def __repr__(self):
        return repr((self.id, self.name, self.date, self.price, self.comment, self.status, self.subOrderCount, self.materialSubOrderInfoList))
