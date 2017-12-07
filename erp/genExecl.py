import pandas as pd
import numpy as np
from .models import *
from .stockInfo import *
import datetime as dt
import json,os,shutil

title = ["时间",'订单','产品', '物料', '批次', '数量', '金额']
titleWithoutMoney = ["时间",'订单','产品', '物料', '批次', '数量']
ProductTitleWithoutMoney = ["时间",'订单','产品', '数量']
titleCheckIn = ["时间",'采购订单', '物料', '批次', '数量','单价','总价','供应商']
productTitleCheckIn = ["时间", '订单', '产品','数量']
stockTitleInfo = ["物料分类/名称",'数量','单位']
targetDir = 'erp/static/erp/download/'
path = 'static/erp/download/'
allMaterialInfo = Node('')
allProductInfo = Node('')

class checkInOutInfo:
    def __init__(self):
        filename = ''
        pathInfo = ''
    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

def genCheckInInfoFromSql(name):
    allRecords = []
    allMaterialInfo = getTree(name)

    if name == '原材料':
        for checkin_sql in CheckInRawMatRepoRecord.objects.all():
            oneRecord = []
            rawMatOrder_sql = RawMatOrder.objects.get(pk=checkin_sql.rawMatOrderItem_id)
            material_sql = RawMat.objects.get(pk=checkin_sql.rawMaterial_id)
            rawMatOrderItem_sql = RawMatOrderItem.objects.get(rawMatOrder=rawMatOrder_sql,rawMat=material_sql)
            oneRecord.append(checkin_sql.act_date.strftime('%Y-%m-%d %H:%M'))
            oneRecord.append(rawMatOrder_sql.name)
            oneRecord.append(getPathInfo(allMaterialInfo,material_sql.id))
            oneRecord.append(checkin_sql.batch_nr)
            oneRecord.append(checkin_sql.num)

            if rawMatOrderItem_sql.num != 0:
                oneRecord.append(rawMatOrderItem_sql.est_total_price/rawMatOrderItem_sql.num)
                oneRecord.append(checkin_sql.num*rawMatOrderItem_sql.est_total_price/rawMatOrderItem_sql.num)
            else:
                oneRecord.append(0)
                oneRecord.append(0)

            if rawMatOrderItem_sql.vendor != None:
                oneRecord.append(rawMatOrderItem_sql.vendor.name)
            else: 
                oneRecord.append('')            
            allRecords.append(oneRecord)

    if name == '成品':
        for checkin_sql in CheckInProductRepoRecord.objects.all():
            oneRecord = []
            saleItem_sql = SalesItem.objects.get(pk=checkin_sql.salesItem_id)
            product_sql = RawMat.objects.get(pk=saleItem_sql.product_id)
            saleOrder_sql = SalesOrder.objects.get(pk=saleItem_sql.salesOrder_id)
            oneRecord.append(checkin_sql.act_date.strftime('%Y-%m-%d %H:%M'))
            oneRecord.append(saleOrder_sql.name)
            oneRecord.append(getPathInfo(allMaterialInfo,product_sql.id))
            oneRecord.append(checkin_sql.num)

            allRecords.append(oneRecord)
    print(allRecords)
    return allRecords

def gencheckoutfromSql(name):
    allRecords = []
    allMaterialInfo = getTree(name)

    if name == '原材料':
        for checkout_sql in CheckOutRawMatRepoRecord.objects.all():
            oneRecord = []
            saleItem_sql = SalesItem.objects.get(pk=checkout_sql.salesItem_id)
            material_sql = RawMat.objects.get(pk=checkout_sql.rawMaterial_id)
            saleOrder_sql = SalesOrder.objects.get(pk=saleItem_sql.salesOrder_id)
            product_sql = RawMat.objects.get(pk=saleItem_sql.product_id)
            oneRecord.append(checkout_sql.act_date.strftime('%Y-%m-%d %H:%M'))
            oneRecord.append(saleOrder_sql.name)
            oneRecord.append(product_sql.name)
            # oneRecord.append(material_sql.name)
            oneRecord.append(getPathInfo(allMaterialInfo,material_sql.id))
            oneRecord.append(checkout_sql.batch_nr)
            oneRecord.append(checkout_sql.num)
            allRecords.append(oneRecord)

    if name == '成品':
        for checkout_sql in CheckOutProductRepoRecord.objects.all():
            oneRecord = []
            saleItem_sql = SalesItem.objects.get(pk=checkout_sql.salesItem_id)
            saleOrder_sql = SalesOrder.objects.get(pk=saleItem_sql.salesOrder_id)
            product_sql = RawMat.objects.get(pk=saleItem_sql.product_id)
            oneRecord.append(checkout_sql.act_date.strftime('%Y-%m-%d %H:%M'))
            oneRecord.append(saleOrder_sql.name)
            # oneRecord.append(product_sql.name)
            oneRecord.append(getPathInfo(allMaterialInfo,product_sql.id))
            oneRecord.append(checkout_sql.num)
            allRecords.append(oneRecord)
    print(allRecords)      
    return allRecords

def genDatafromSqlbyOrderId(orderId):
    order = SalesOrder.objects.get(pk=orderId)
    allRecords = []
    for saleItem_sql in order.salesitem_set.all():
        product_sql = RawMat.objects.get(pk=saleItem_sql.product_id)
        for checkOutrecord_sql in saleItem_sql.checkoutrawmatreporecord_set.all():
            oneRecord = []
            check_date = checkOutrecord_sql.act_date.strftime('%Y-%m-%d %H:%M')
            oneRecord.append(check_date)
            material_sql = RawMat.objects.get(
                pk=checkOutrecord_sql.rawMaterial_id)
            oneRecord.append(order.name)
            oneRecord.append(product_sql.name)
            oneRecord.append(material_sql.name)
            oneRecord.append(checkOutrecord_sql.batch_nr)
            oneRecord.append(checkOutrecord_sql.num)
            query_set = RawMatOrderItem.objects.filter(
                rawMat=material_sql, status="已关闭")
            if (query_set.count() > 0):
                RawMatOrderItem_sql = query_set.reverse()[0]
                if RawMatOrderItem_sql:
                    oneRecord.append(
                        checkOutrecord_sql.num * RawMatOrderItem_sql.est_total_price / RawMatOrderItem_sql.num)
            else:
                oneRecord.append(0)
            allRecords.append(oneRecord)

    return allRecords


def loopTree(rootNode,pathInfo,allRecordsInfo):
    oneRecord = []
    pathInfo = pathInfo + '-'
    for leaf in rootNode.leafs:
        oneRecord.append(pathInfo + rootNode.name + '-' + leaf.name)
        oneRecord.append(leaf.instockNum)
        oneRecord.append(leaf.unit)
        allRecordsInfo.append(oneRecord)
        oneRecord = []

    for node in rootNode.subNodes:
        loopTree(node, pathInfo + rootNode.name, allRecordsInfo)

def getPathInfo(rootNode, nodeId):
    for leaf in  rootNode.leafs:
        if leaf.id == nodeId:
            return rootNode.name + '-' + leaf.name

    for node in rootNode.subNodes:
        name = getPathInfo(node,nodeId)
        if type(name) == type(''):
            return rootNode.name + '-' + name

def genStockExecl(name):
    today = dt.date.today()
    filename = name + '库存-%s.xlsx' % today.strftime("%Y-%m-%d")
    allRecords = []
    allInfo = getTree(name)
    
    if name == '原材料':
        allMaterialInfo = allInfo
    else:
        allProductInfo = allInfo 
    
    loopTree(allInfo, '', allRecords)

    print(allRecords)
    df = pd.DataFrame(allRecords,columns=stockTitleInfo)
    writer = pd.ExcelWriter(filename, engine='xlsxwriter')
    df.to_excel(writer, 'Sheet1')
    writer.save()
    shutil.move(filename, targetDir+filename)
    infos = checkInOutInfo()
    infos.fileName = filename
    infos.pathInfo = path
    return infos.toJson()    

def gencheckInExecl(name):
    records = genCheckInInfoFromSql(name)
    today = dt.date.today()
    
    if name == '原材料':
        titleName = titleCheckIn
    else:
        titleName = productTitleCheckIn

    filename = name + '入库记录-%s.xlsx' % today.strftime("%Y-%m-%d")
    df = pd.DataFrame(records,columns=titleName)
    writer = pd.ExcelWriter(filename, engine='xlsxwriter')
    df.to_excel(writer, 'Sheet1')
    writer.save()
    # shutil.move('cp -f ' + filename + ' ' + targetDir+filename)
    shutil.move(filename, targetDir+filename)
    infos = checkInOutInfo()
    infos.fileName = filename
    infos.pathInfo = path
    return infos.toJson()

def gencheckoutExecl(name):
    records = gencheckoutfromSql(name)
    today = dt.date.today()

    if name == '原材料':
        titleName = titleWithoutMoney
    else:
        titleName = ProductTitleWithoutMoney

    df = pd.DataFrame(records,columns=titleName)
    filename = name + '出库记录-%s.xlsx' % today.strftime("%Y-%m-%d")
    writer = pd.ExcelWriter(filename, engine='xlsxwriter')
    df.to_excel(writer, 'Sheet1')
    writer.save()
    # linuxCommand = 'cp -f ' + filename + ' ' + targetDir+filename
    # os.system(linuxCommand)
    shutil.move(filename, targetDir+filename)
    infos = checkInOutInfo()
    infos.fileName = filename  
    infos.pathInfo = path
    return infos.toJson()


def genExeclByOrderId(orderId):
    records = genDatafromSqlbyOrderId(orderId)
    order = SalesOrder.objects.get(pk=orderId)
    df = pd.DataFrame(records,columns=title)
    today = dt.date.today()
    filename = order.name + '-%s.xlsx' % today.strftime("%Y-%m-%d")
    writer = pd.ExcelWriter(filename, engine='xlsxwriter')
    df.to_excel(writer, 'Sheet1')
    writer.save()
    # os.system('cp -f ' + filename + ' ' + targetDir+filename)
    shutil.move(filename, targetDir+filename)
    infos = checkInOutInfo()
    infos.fileName = filename
    infos.pathInfo = path
    return infos.toJson()

def genJsonByOrderId(orderId):
    records = genDatafromSqlbyOrderId(1)
    df = pd.DataFrame(records,columns=title)
    return df.to_json()
