import json
from .orderInfo import OrderInfo 

class OrderListInfo:
    def __init__(self):
        self.orderInfoList = []
        self.orderTitle = []
        self.orderCount = 0 

    def addOrderInfo(self, orderInfo):
        self.orderCount = self.orderCount + 1
        self.orderInfoList.append(orderInfo)

    def addOrderTtile(self, orderInfo):
        self.orderTitle.append(orderInfo)

    def __repr__(self):
        return repr((self.orderInfoList, self.orderTitle))

    def toJson(self):
        return json.dumps(self,default=lambda o: o.__dict__, sort_keys=True, indent=4)
