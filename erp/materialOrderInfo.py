class MaterialSubOrderInfo:
    def __init__(self, pid, name, num, unit, unit_price, total_price, comment):
        self.id = pid
        self.name = name
        self.num = num
        self.unit = unit
        self.unit_price = unit_price
        self.total_price = total_price
        self.comment = comment

    def __repr__(self):
        return repr(self.id, self.name, self.num, self.unit, self.comment, self.unit_price, self.total_price)

class MaterialOrderInfo:
    def __init__(self, pid, name, date, price, comment, orderStatus):
        self.id = pid
        self.name = name
        self.date = date
        self.price = price
        self.comment = comment
        self.status = orderStatus
        self.subOrderCount = 0 
        self.materialSubOrderInfoList = []

    def addMaterialSubOrder(self,materialSubOrderInfo):
        self.subOrderCount = self.subOrderCount + 1
        self.materialSubOrderInfoList.append(materialSubOrderInfo)

    def __repr__(self):
        return repr(self.id, self.name, self.date, self.price, self.comment, self.status, self.materialSubOrderInfoList)
