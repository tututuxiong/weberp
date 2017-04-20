import json
from .models import *

scuessfullMessage = '{"value":"OK"}'
errorMessage = '{"value":"ERROR"}'

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

    def setJson2Class(self, dict_data):
        print(dict_data)
        for name, value in dict_data.items():
            if hasattr(self, name):
                setattr(self, name, value)


def initOrderInfoFromSqlData(tmp_orderInfo, order):
    tmp_orderInfo.comment = order.comment
    tmp_orderInfo.date = order.act_date.strftime('%Y-%m-%d %H:%M')
    tmp_orderInfo.desc = order.desc
    tmp_orderInfo.id = order.id
    tmp_orderInfo.materialStatus = order.raw_mat_status
    tmp_orderInfo.name = order.name
    tmp_orderInfo.price = float(order.total_price)
    tmp_orderInfo.sales = order.saler
    tmp_orderInfo.status = order.status


def fetchOrderFromSqlById(id):
    order = SalesOrder.objects.get(pk=id)
    tmp_orderInfo = OrderInfo()
    initOrderInfoFromSqlData(tmp_orderInfo, order)
    return tmp_orderInfo


def addSalerOrder2Sql(tmp_orderInfo):
    if tmp_orderInfo.id == -1:
        newSalesOrder_sql = SalesOrder(
            name=tmp_orderInfo.name, status="INIT", saler=tmp_orderInfo.sales, total_price=tmp_orderInfo.price, desc=tmp_orderInfo.desc, comment=tmp_orderInfo.desc)
        newSalesOrder_sql.save()
        tmp_orderInfo.id = newSalesOrder_sql.id
        tmp_orderInfo.date = newSalesOrder_sql.act_date.strftime('%Y-%m-%d %H:%M')
        return tmp_orderInfo


def deleteSalerOrder2Sql(order_id):
    error = {}
    error.info = "ok"
    salerOrder_sql = SalesOrder.objects.get(pk=order_id)
    if salerOrder_sql.salesitem_set.count():
        error.info = "subProduct should be delete"
        return json.dump(error)
    elif salerOrder_sql.rawmatorder.count():
         error.info = "material order should be delete"
         return json.dump(error)

    salerOrder_sql.delete()
    return json.dump(error)

def updateSalerOrder2Sql(tmp_orderInfo):
     try:
         salerOrder_sql=SalesOrder.objects.get(pk=order_id)
         salerOrder_sql.status= tmp_orderInfo.status
         salerOrder_sql.desc = tmp_orderInfo.desc
         salerOrder_sql.comment = tmp_orderInfo.comment
         salerOrder_sql.save()
         return tmp_orderInfo
     except SalesOrder.DoesNotExist:
         return errorMessage

                
