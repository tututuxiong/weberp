import json
from .models import *
from .vendor import *
import datetime as dt

class MaterialSubOrderInfo:
    count = 0

    def __init__(self):
        self.id = 0
        self.materialOrderId = 0
        self.materialId = 0
        self.vendor = VendorInfo("")
        self.date = ''
        self.name = ''
        self.num = 0
        self.unit = ''
        self.unit_price = 0
        self.comment = ''
        self.status = ''

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
        return repr((self.id, self.materialOrderId, self.materialId, self.name, self.num, self.unit, self.unit_price, self.comment,self.vendor.name))

    def setJson2Class(self, dict_data):
        for name, value in dict_data.items():
            if hasattr(self, name):
                if name == "vendor":
                    self.vendor.setJson2Class(value)
                else:
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

    def setFormalId(self, orderId):
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
        return repr((self.id, self.orderId, self.name, self.date, self.price, self.comment, self.status, self.subOrderCount, self.materialSubOrderInfoList))

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
                        self.materialSubOrderInfoList.append(
                            tmp_materialSubOrder)
                else:
                    setattr(self, name, value)


def initmaterialOrderFromSql(materialOrder, materialOrderSql_item):
    materialOrder.id = materialOrderSql_item.id
    materialOrder.date = materialOrderSql_item.act_date.strftime(
        '%Y-%m-%d %H:%M')
    materialOrder.status = materialOrderSql_item.status
    materialOrder.comment = materialOrderSql_item.comment
    materialOrder.orderId = materialOrderSql_item.salesOrder_id
    materialOrder.name = materialOrderSql_item.name

    for rawMatOrderItem in materialOrderSql_item.rawmatorderitem_set.all():
        materialSubOrderInfo = MaterialSubOrderInfo()
        materialSubOrderInfo.id = rawMatOrderItem.id
        try:
            material = RawMat.objects.get(pk=rawMatOrderItem.rawMat_id)
            materialSubOrderInfo.materialId = material.id
            materialSubOrderInfo.name = material.name
            materialSubOrderInfo.unit = material.unit
            materialSubOrderInfo.num = rawMatOrderItem.num
            materialSubOrderInfo.status = rawMatOrderItem.status
            if rawMatOrderItem.reg_date != None:
                materialSubOrderInfo.date = rawMatOrderItem.reg_date.strftime('%Y-%m-%d')
            materialSubOrderInfo.unit_price = float(rawMatOrderItem.est_total_price/rawMatOrderItem.num)
            materialSubOrderInfo.comment = ''
            materialOrder.addMaterialSubOrder(materialSubOrderInfo)

            if rawMatOrderItem.vendor_id != None:
                print(rawMatOrderItem.vendor_id)
                vendor_sql = Vendor.objects.get(pk=rawMatOrderItem.vendor_id)
                materialSubOrderInfo.vendor.id = vendor_sql.id
                materialSubOrderInfo.vendor.name = vendor_sql.name
            else:
                materialSubOrderInfo.vendor.id = 0
                materialSubOrderInfo.vendor.name = ""

        except RawMat.DoesNotExist:
            print("addMaterialOrder2Sql Wront  rawMatOrderItem.rawMat_id !!!")


def addMaterialOrder2Sql(material_order):
    try:
        if material_order.orderId != 0:
            order = SalesOrder.objects.get(pk=material_order.orderId)
            materialOrderSql = RawMatOrder(
                salesOrder=order, name=material_order.name, comment=material_order.comment)
        else:
            materialOrderSql = RawMatOrder(name=material_order.name, comment=material_order.comment)
        materialOrderSql.save()
        material_order.id = materialOrderSql.id
        material_order.date = materialOrderSql.act_date.strftime(
            '%Y-%m-%d %H:%M')

        for materialSubOrderInfo_item in material_order.materialSubOrderInfoList:
            try:
                material = RawMat.objects.get(
                    pk=materialSubOrderInfo_item.materialId)
                materialOrderSqlItem = materialOrderSql.rawmatorderitem_set.create(
                    rawMat=material, num=materialSubOrderInfo_item.num, est_total_price=(materialSubOrderInfo_item.unit_price * materialSubOrderInfo_item.num))
                if materialSubOrderInfo_item.date != '':
                    materialOrderSqlItem.reg_date = dt.datetime.strptime(materialSubOrderInfo_item.date,'%Y-%m-%d')
                materialOrderSqlItem.status = materialSubOrderInfo_item.status
                materialOrderSqlItem.save()
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
        return errorMessage


def getMaterialOrderFromSqlById(material_order_id):
    try:
        material_order_sql = RawMatOrder.objects.get(pk=material_order_id)
        tmp_materialOrder = MaterialOrderInfo()
        initmaterialOrderFromSql(tmp_materialOrder, material_order_sql)

        return tmp_materialOrder

    except RawMatOrder.DoesNotExist:
        print("Wront (get) RawMatOrder id !!!")
        return errorMessage


def updateMaterialOrder2Sql(material_order):
    try:
        material_order_sql = RawMatOrder.objects.get(pk=material_order.id)
        material_order_sql.name = material_order.name
        material_order_sql.comment = material_order.comment
        material_order_sql.status = material_order.status
        material_order_sql.save()
        print(material_order)
        for materialSubOrderInfo_item in material_order.materialSubOrderInfoList:
            print(materialSubOrderInfo_item)
            try:
                if (materialSubOrderInfo_item.id != -1):
                    print("materialSubOrderInfo_item.id = ",
                          materialSubOrderInfo_item.id)
                    RawMatOrderItem_sql = RawMatOrderItem.objects.get(
                        pk=materialSubOrderInfo_item.id)
                    RawMatOrderItem_sql.num = materialSubOrderInfo_item.num
                    RawMatOrderItem_sql.est_total_price = materialSubOrderInfo_item.unit_price * materialSubOrderInfo_item.num
                    RawMatOrderItem_sql.status = materialSubOrderInfo_item.status
                    if materialSubOrderInfo_item.date != '':
                        expertTime = dt.datetime.strptime(materialSubOrderInfo_item.date,'%Y-%m-%d')
                        RawMatOrderItem_sql.reg_date = expertTime

                    if materialSubOrderInfo_item.vendor.id != 0:
                        vendor_sql = Vendor.objects.get(pk=materialSubOrderInfo_item.vendor.id)
                        RawMatOrderItem_sql.vendor = vendor_sql
                    RawMatOrderItem_sql.save()
                else:
                    addNewmaterialSubOrderInfo2Sql(
                        material_order_sql, materialSubOrderInfo_item)

            except RawMatOrder.DoesNotExist:
                print(" updateMaterialOrder2Sql Wront (get) RawMatOrderItem id(%d) !!!",
                      materialSubOrderInfo_item.id)
                return errorMessage

        # check to delete some items
        for RawMatOrderItem_sql in material_order_sql.rawmatorderitem_set.all():
            isDelete = True
            for materialSubOrderInfo_item in material_order.materialSubOrderInfoList:
                if (RawMatOrderItem_sql.id == materialSubOrderInfo_item.id):
                    isDelete = False
                    break
            if (isDelete == True):
                RawMatOrderItem_sql.delete()

    except RawMatOrder.DoesNotExist:
        print(" updateMaterialOrder2Sql Wront (get) RawMatOrder id !!!")
        return errorMessage


def addNewmaterialSubOrderInfo2Sql(rawMatOrderSql, materialSubOrderInfo):
    try:
        material = RawMat.objects.get(pk=materialSubOrderInfo.materialId)
        rawmatorderitemSql = rawMatOrderSql.rawmatorderitem_set.create(
            rawMat=material, num=materialSubOrderInfo.num,
            est_total_price=(materialSubOrderInfo.unit_price*materialSubOrderInfo.num))
        if materialSubOrderInfo.date != '':
            rawmatorderitemSql.reg_date = dt.datetime.strptime(materialSubOrderInfo.date,'%Y-%m-%d')
            rawmatorderitemSql.save()
                 
        materialSubOrderInfo.id = rawmatorderitemSql.id
    except RawMat.DoesNotExist:
        print("addNewmaterialSubOrderInfo2Sql Wront material_requiment_item.materialId !!!")
