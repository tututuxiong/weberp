import json
from .orderInfo import *


class MaterialRequiment:
    def __init__(self, name, unit, count):
        self.name = name
        self.count = count
        self.unit = unit
        self.id = 0
        self.materialId = 0

    def setJson2Class(self, dict_data):
        for name, value in dict_data.items():
            if hasattr(self, name):
                setattr(self, name, value)


class SubProductInfo:
    count = 0

    def __init__(self):
        self.id = 0
        self.orderId = 0
        self.name = ''
        self.count = 0
        self.unit = ''
        self.price = 0
        self.total = ''
        self.comment = ''
        self.stockId = 0
        self.materialRequrimentList = []

    def setFormalId(self, orderId):
        if self.id == 0:
            self.id = SubProductInfo.count + 1
            SubProductInfo.count = SubProductInfo.count + 1
        self.orderId = orderId

    def setValue(self, name, count, unit, price, comment):
        self.name = name
        self.count = count
        self.unit = unit
        self.price = price
        self.total = self.count * self.price
        self.comment = comment

    def __repr__(self):
        return repr((self.id, self.orderId, self.name, self.count, self.unit, self.price, self.total, self.comment, self.stockId, self.materialRequrimentList))

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

    def addsubProductMaterial(self, name, unit, count):
        self.materialRequrimentList.append(
            MaterialRequiment(name, unit, count))

    def setJson2Class(self, dict_data):
        for name, value in dict_data.items():
            if hasattr(self, name):
                if (name != "materialRequrimentList"):
                    setattr(self, name, value)
                else:
                    for materialRequiment_item in value:
                        tmp_materialRequiment = MaterialRequiment("", "", 0)
                        tmp_materialRequiment.setJson2Class(
                            materialRequiment_item)
                        self.materialRequrimentList.append(
                            tmp_materialRequiment)


def getSubProductFromSqlById(id):
    try:
        subproduct_sql = SalesItem.objects.get(pk=id)
        tmp_subProductInfo = SubProductInfo()
        initSubProductFromSql(tmp_subProductInfo, subproduct_sql)
        return tmp_subProductInfo

    except SalesItem.DoesNotExist:
        print("Wront  SubProduct Id !!!")


def deleteSubProductFromSqlById(id):
    scuessfullMessage = '{"value":"OK"}'
    errorMessage = '{"value":"ERROR"}'
    try:
        subproduct_sql = SalesItem.objects.get(pk=id)

        for materialRequimentSql_item in subproduct_sql.rawmatrequirement_set.all():
            materialRequimentSql_item.delete()
        subproduct_sql.delete()
        return scuessfullMessage

    except SalesItem.DoesNotExist:
        print("Wront  SubProduct Id !!!")
        return errorMessage


def initSubProductFromSql(tmp_subProductInfo, subproduct_sql):
    tmp_subProductInfo.id = subproduct_sql.id
    tmp_subProductInfo.orderId = subproduct_sql.salesOrder_id
    # tmp_subProductInfo.name = subproduct_sql.name
    tmp_subProductInfo.count = subproduct_sql.est_num
    # tmp_subProductInfo.unit = subproduct_sql.unit
    tmp_subProductInfo.comment = subproduct_sql.comment
    tmp_subProductInfo.price = float(subproduct_sql.est_total_price)
    tmp_subProductInfo.total = float(
        subproduct_sql.est_total_price) * subproduct_sql.est_num

    product_sql = RawMat.objects.get(pk=subproduct_sql.product_id)
    tmp_subProductInfo.name = product_sql.name
    tmp_subProductInfo.unit = product_sql.unit
    tmp_subProductInfo.stockId = product_sql.id

    for mr in subproduct_sql.rawmatrequirement_set.all():
        tmp_mr = MaterialRequiment("", "", 0)
        tmp_mr.count = mr.num

        rawmat_id = mr.rawMaterial_id
        if (rawmat_id != 0):
            rawMat = RawMat.objects.get(pk=rawmat_id)
            tmp_mr.unit = rawMat.unit
            tmp_mr.name = rawMat.name
            tmp_mr.id = mr.id
            tmp_mr.materialId = rawMat.id

        tmp_subProductInfo.materialRequrimentList.append(tmp_mr)


def addSubProduct2Sql(subProductI):
    try:
        order = SalesOrder.objects.get(pk=subProductI.orderId)
        sales_item = order.salesitem_set.create(
            est_num=subProductI.count, est_total_price=subProductI.price, unit=subProductI.unit)
        sales_item.name = subProductI.name
        sales_item.comment = subProductI.comment
        sales_item.save()
        subProductI.id = sales_item.id

        for material_requiment_item in subProductI.materialRequrimentList:
            try:
                materialSql = RawMat.objects.get(
                    pk=material_requiment_item.materialId)
                material_item = sales_item.rawmatrequirement_set.create(
                    rawMaterial=materialSql, num=material_requiment_item.count)
                material_item.save()
                material_requiment_item.id = material_item.id

            except SalesOrder.DoesNotExist:
                print("Wront  subProductI.orderId !!!")

        pass

    except SalesOrder.DoesNotExist:
        print("Wront  subProductI.orderId !!!")


def updateSubProduct2Sql(salesItem_id, subProductI):
    try:
        salesItem = SalesItem.objects.get(pk=salesItem_id)
        salesItem.est_num = subProductI.count
        salesItem.unit = subProductI.unit
        RawMatRequirement.comment = subProductI.comment
        salesItem.est_total_price = subProductI.price
        salesItem.save()

        for material_requiment_item in subProductI.materialRequrimentList:
            try:
                if (material_requiment_item != 0):
                    rawMatRequirement = RawMatRequirement.objects.get(
                        pk=material_requiment_item.id)
                    rawMatRequirement.num = material_requiment_item.count
                    rawMatRequirement.save()
                else:
                    AddnewRawMatRequirement2Sql(
                        salesItem, material_requiment_item)
            except RawMatRequirement.DoesNotExist:
                print("Wront  material_requiment_item.id !!!")

        #check whether need delete some material_requiment_item#
        for sql_rawMatRequriment_item in salesItem.rawmatrequirement_set.all():
            isDelete = True
            for material_requiment_item in subProductI.materialRequrimentList:
                if (sql_rawMatRequriment_item.id == material_requiment_item.id):
                    isDelete = False
                    break
            if (isDelete == True):
                sql_rawMatRequriment_item.delete()

    except SalesItem.DoesNotExist:
        print("Wront salesItem_id !!!")


def AddnewRawMatRequirement2Sql(sales_item, material_requiment_item):
    try:
        material = RawMat.objects.get(pk=material_requiment_item.materialId)
        tmp_rawMatRequirement = RawMatRequirement(
            salesItem=sales_item, rawMaterial=materialId, num=material_requiment_item.count)
    except RawMat.DoesNotExist:
        print("Wront material_requiment_item.materialId !!!")
