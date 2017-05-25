import json
from .orderInfo import *
from django.utils import timezone
from .models import *

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
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)


def fetchOrderListFromSql():
    orderList = OrderListInfo()
    for order in SalesOrder.objects.order_by('-act_date'):
        tmp_orderInfo = OrderInfo()
        initOrderInfoFromSqlData(tmp_orderInfo,order)
        orderList.addOrderInfo(tmp_orderInfo)
    return orderList


            
