import pandas as pd
import numpy as np
from .models import *

title = ["时间",'订单','产品', '物料', '批次', '数量', '金额']

def genDatafromSql(orderId):
    checkoutRecord_time = []
    checkoutRecord_salerOrderName = []
    checkoutRecord_productName = []
    checkoutRecord_materialName = []
    checkoutRecord_materialBatch = []
    checkoutRecord_materialCount = []
    checkoutRecord_materialPrice = []
    order = SalesOrder.objects.get(pk=orderId)
    for saleItem_sql in order.salesitem_set.all():
        product_sql = RawMat.objects.get(pk=saleItem_sql.product_id)
        
        for checkOutrecord_sql in saleItem_sql.checkoutrawmatreporecord_set.all():
            material_sql = RawMat.objects.get(
                pk=checkOutrecord_sql.rawMaterial_id)
            checkoutRecord_salerOrderName.append(order.name)
            check_date = checkOutrecord_sql.act_date.strftime('%Y-%m-%d %H:%M')
            checkoutRecord_time.append(check_date)
            checkoutRecord_productName.append(product_sql.name)
            
            checkoutRecord_materialName.append(material_sql.name)
            checkoutRecord_materialBatch.append(checkOutrecord_sql.batch_nr)
            checkoutRecord_materialCount.append(checkOutrecord_sql.num)
            query_set = RawMatOrderItem.objects.filter(
                rawMat=material_sql, status="已关闭")
            if (query_set.count() > 0):
                RawMatOrderItem_sql = query_set.reverse()[0]
                if RawMatOrderItem_sql:
                    checkoutRecord_materialPrice.append(
                        checkOutrecord_sql.num * RawMatOrderItem_sql.est_total_price / RawMatOrderItem_sql.num)
            else:
                checkoutRecord_materialPrice.append(0)

    records = {"时间": checkoutRecord_time, '订单':checkoutRecord_salerOrderName,"产品": checkoutRecord_productName, "物料": checkoutRecord_materialName,
               "批次": checkoutRecord_materialBatch, "数量": checkoutRecord_materialCount, "金额": checkoutRecord_materialPrice}
    print(records)
    return records


def genExecl(orderId):
    records = genDatafromSql(1)
    order = SalesOrder.objects.get(pk=orderId)
    df = pd.DataFrame(records).reindex_axis(title, 1)
    writer = pd.ExcelWriter(order.name + '.xlsx', engine='xlsxwriter')
    df.to_excel(writer, 'Sheet1')
    writer.save()
