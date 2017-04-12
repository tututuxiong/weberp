import json
from .models import *

class MaterialSubOrderInfo:
    count = 0

    def __init__(self):
        self.id = 0
        self.materialOrderId = 0
        self.materialId = 0
        self.name = ''
        self.num = 0
        self.unit = ''
        self.unit_price = 0
        self.total_price = 0
        self.comment = ''

    def setFormalId(self, materialOrderId):
        if self.id == -1:
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
        return repr((self.id, self.materialOrderId, self.materialId, self.name, self.num, self.unit, self.unit_price, self.total_price, self.comment))

        
    def setJson2Class(self, dict_data):
        for name, value in dict_data.items():
            if hasattr(self, name):
                setattr(self, name, value)

class MaterialOrderInfo:
    count = 0

    def __init__(self):
        self.id = 0
        self.orderId = 0
        self.name = ''
        self.date = ''
        self.price = 0
        self.comment = ''
        self.status = ''
        self.subOrderCount = 0
        self.materialSubOrderInfoList = []

    def setFormalId(self,orderId):
        if self.id == -1:
            self.id = MaterialOrderInfo.count + 1
            MaterialOrderInfo.count = MaterialOrderInfo.count + 1
        self.orderId = orderId

    def setValue(self, name, date, comment, orderStatus):
        self.name = name
        self.date = date
        self.comment = comment
        self.status = orderStatus

    def addMaterialSubOrder(self, materialSubOrderInfo):
        self.subOrderCount = self.subOrderCount + 1
        self.materialSubOrderInfoList.append(materialSubOrderInfo)

    def __repr__(self):
        return repr((self.id,self.orderId, self.name, self.date, self.price, self.comment, self.status, self.subOrderCount, self.materialSubOrderInfoList))

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
    
    def allocMaterialSubOrderId(self):
        for materialSubOrder in self.materialSubOrderInfoList:
            materialSubOrder.setFormalId(self.id)
        
    def setJson2Class(self, dict_data):
        for name, value in dict_data.items():
            if hasattr(self, name):
                if (name == "materialSubOrderInfoList"):
                    for materialSubOrder in value:
                        tmp_materialSubOrder = MaterialSubOrderInfo()
                        tmp_materialSubOrder.setJson2Class(materialSubOrder)
                        tmp_materialSubOrder.setFormalId(self.id)
                        self.materialSubOrderInfoList.append(tmp_materialSubOrder)
                else:
                    setattr(self, name, value)

def initmaterialOrderFromSql(materialOrder,materialOrderSql_item):
    materialOrder.id  = materialOrderSql_item.id
    materialOrder.date = materialOrderSql_item.act_date.strftime('%Y-%m-%d %H:%M')
    materialOrder.status = materialOrderSql_item.status
    materialOrder.comment = materialOrderSql_item.comment
    materialOrder.orderId = materialOrderSql_item.salesOrder_id
    materialOrder.name = materialOrderSql_item.name

    for rawMatOrderItem in materialOrderSql_item.rawmatorderitem_set.all():
        materialSubOrderInfo = MaterialSubOrderInfo()
        materialSubOrderInfo.id = rawMatOrderItem.id
        try:
            material = RawMat.objects.get(pk = rawMatOrderItem.rawMat_id) 
            materialSubOrderInfo.materialId = material.id
            materialSubOrderInfo.name = material.name
            materialSubOrderInfo.unit = material.unit
            materialSubOrderInfo.num = rawMatOrderItem.num
            materialSubOrderInfo.unit_price = 0
            materialSubOrderInfo.total_price = float(rawMatOrderItem.est_total_price)
            materialSubOrderInfo.comment = ''        
            materialOrder.addMaterialSubOrder(materialSubOrderInfo)

        except RawMat.DoesNotExist:
            print("addMaterialOrder2Sql Wront  rawMatOrderItem.rawMat_id !!!")                

def addMaterialOrder2Sql(material_order):
    try:
        order = SalesOrder.objects.get(pk = material_order.orderId)
        materialOrderSql = order.rawmatorder_set.create(name = material_order.name, comment = material_order.comment)
        material_order.id = materialOrderSql.id
        material_order.date = materialOrderSql.act_date.strftime('%Y-%m-%d %H:%M')

        for materialSubOrderInfo_item in material_order.materialSubOrderInfoList:
            try:
                material = RawMat.objects.get(pk = materialSubOrderInfo_item.materialId)
                materialOrderSqlItem = materialOrderSql.rawmatorderitem_set.create(rawMat = material, num = materialSubOrderInfo_item.num, est_total_price = materialSubOrderInfo_item.total_price)
                materialSubOrderInfo_item.id = materialOrderSqlItem.id
                materialSubOrderInfo_item.name = material.name
                materialSubOrderInfo_item.unit = material.unit

            except SalesOrder.DoesNotExist:
                print("addMaterialOrder2Sql Wront  materialId !!!")                

    except SalesOrder.DoesNotExist:
        print("Wront (add) material_order.orderId !!!")

scuessfullMessage = '{"value":"OK"}'
errorMessage = '{"value":"ERROR"}'
    
def delMaterialOrder2Sql(material_order_id):
    try:
        material_order = RawMatOrder.objects.get(pk=material_order_id)
        for materialOrderSqlItem in material_order.rawmatorderitem_set.all():
            materialOrderSqlItem.delete()
        material_order.delete()
        return scuessfullMessage

    except RawMatOrder.DoesNotExist:
        print("Wront (del)  RawMatOrder id !!!")
        return  errorMessage

def getMaterialOrderFromSqlById(material_order_id):
    try:
        material_order_sql = RawMatOrder.objects.get(pk=material_order_id)
        tmp_materialOrder = MaterialOrderInfo()
        initmaterialOrderFromSql(tmp_materialOrder,material_order_sql)

        return tmp_materialOrder

    except RawMatOrder.DoesNotExist:
        print("Wront (get) RawMatOrder id !!!")
        return  errorMessage