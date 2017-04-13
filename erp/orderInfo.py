import json
from .models import *

class OrderInfo:
    count = 0

    def __init__(self):
        self.id = 0
        self.name = ''
        self.date = ''
        self.desc = ''
        self.price = 0
        self.sales = ''
        self.comment = ''
        self.status = ''
        self.materialStatus = ''
        self.deliveryStatus = ''

    def setFormalId(self):
        if self.id == 0:
            self.id = OrderInfo.count + 1
            OrderInfo.count = OrderInfo.count + 1

    def setValue(self, name, date, desc, price, sales, comment, orderStatus):
        self.name = name
        self.date = date
        self.desc = desc
        self.price = price
        self.sales = sales
        self.comment = comment
        self.status = orderStatus
        self.materialStatus = ''
        self.deliveryStatus = ''

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

    def __repr__(self):
        return repr((self.id, self.name, self.date, self.desc, self.price, self.sales, self.comment, self.status, self.materialStatus, self.deliveryStatus))


def initOrderInfoFromSqlData(tmp_orderInfo, order):
    tmp_orderInfo.comment = order.comment
    tmp_orderInfo.date = order.act_date.strftime('%Y-%m-%d %H:%M')
    tmp_orderInfo.desc = order.desc
    tmp_orderInfo.id = order.id
    tmp_orderInfo.materialStatus = order.raw_mat_status
    tmp_orderInfo.name = order.name
    tmp_orderInfo.price = float(order.total_price)
    tmp_orderInfo.sales = order.saler

def fetchOrderFromSqlById(id):
    order = SalesOrder.objects.get(pk = id)
    tmp_orderInfo = OrderInfo()
    initOrderInfoFromSqlData(tmp_orderInfo,order)
    return tmp_orderInfo