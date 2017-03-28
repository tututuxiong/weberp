from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from .orderListInfo import OrderListInfo
from .orderInfo import OrderInfo

from .subProductInfoList import SubProductInfoList
from .subProductInfo import SubProductInfo

from .materialOrderInfo import MaterialOrderInfo, MaterialSubOrderInfo
from .materialOrderInfoList import MaterialOrderInfoList

from .materialInfoStock import MaterialStockInfo, MaterialStockInfoList

import json
# Create your views here.


def index(request):
    return render(request, 'erp/index.html')


def order(request, order_id):
    return HttpResponse(order_info_1.toJson())


def orderList(request):
    return HttpResponse(order_list_info.toJson())


def subProduct(request, order_id, product_id):
    errorMessage = '{"value":"ERROR"}'
    scuessfullMessage = '{"value":"OK"}'
    subProductI = SubProductInfo()

    if request.method == 'POST':
        dict_data = json.loads(request.body.decode())['product']
        subProductI.setJson2Class(dict_data)
        if subProductI.id == int(product_id):
            if sub_product_list.updateSubProductInfo(subProductI):
                return HttpResponse(subProductI.toJson())
            else:
                return HttpResponse(errorMessage)
        else:
            return HttpResponse(errorMessage)

    elif request.method == 'PUT':
        dict_data = json.loads(request.body.decode())['product']
        subProductI.setJson2Class(dict_data)
        if subProductI.id == 0:
            subProductI.setFormalId(int(order_id))
            if sub_product_list.addSubProductInfo(subProductI):
                return HttpResponse(subProductI.toJson())
            else:
                return HttpResponse(errorMessage)

    elif request.method == 'DELETE':
        if sub_product_list.removeSubProductInfo(int(product_id)):
            return HttpResponse(scuessfullMessage)
        else:
            return HttpResponse(errorMessage)

    elif request.method == 'GET':
        subProductI = sub_product_list.getSubProductInfo(int(product_id))
        if None == subProductI:
            return HttpResponse(errorMessage)
        else:
            return HttpResponse(subProductI.toJson())


def subProductList(request, order_id = '0'):
    print("subProductList order id:",order_id)
    if order_id == '0':
        if request.method == 'GET':
            return HttpResponse(sub_product_list.toJson())
    else:
        return HttpResponse(sub_product_list.toJson())

def materialOrderList(request, order_id = '0'):
    print("materialOrderList order id:",order_id)
    if order_id == '0':
        return HttpResponse(material_order_list.toJson())
    else:
        return HttpResponse(material_order_list.toJson())

def materialOrder(request, order_id, procurementOrder_id):
    errorMessage = '{"value":"ERROR"}'
    scuessfullMessage = '{"value":"OK"}'
    material_order_tmp = MaterialOrderInfo()

    if request.method == 'POST':
        dict_data = json.loads(request.body.decode())['materialOrder']
        material_order_tmp.setJson2Class(dict_data)
        if material_order_tmp.id == int(procurementOrder_id):
            if material_order_list.updateMaterialOrderInfo(material_order_tmp):
                return HttpResponse(material_order_tmp.toJson())
            else:
                return HttpResponse(errorMessage)

    elif request.method == 'PUT':
        dict_data = json.loads(request.body.decode())['materialOrder']
        material_order_tmp.setJson2Class(dict_data)
        if material_order_tmp.id == 0:
            material_order_tmp.setFormalId(int(order_id))
            if material_order_list.addMaterialOrderInfo(material_order_tmp):
                return HttpResponse(material_order_tmp.toJson())
            else:
                return HttpResponse(errorMessage)

    elif request.method == 'DELETE':
        if material_order_list.removeMaterialOrderInfo(int(procurementOrder_id)):
            return HttpResponse(scuessfullMessage)
        else:
            return HttpResponse(errorMessage)

    elif request.method == 'GET':
        material_order_tmp = material_order_list.getMaterialOrderInfo(int(procurementOrder_id))
        if None == material_order_tmp:
            return HttpResponse(errorMessage)
        else:
            return HttpResponse(material_order_tmp.toJson())

def materialStockList(request):
    print("fetch materialStockList")
    return  HttpResponse(material_stock_list.toJson())     


def materialStockbyName(request, material_name):
    print("fetch materialStock: ",material_name)

    material_stock_info = MaterialStockInfo()
    material_stock_info.name = material_name
    material_stock_info.instockNum = 10
    material_stock_info.shoppingNum = 30
    return  HttpResponse(material_stock_info.toJson())

# Stub for test
####################################
order_info_1 = OrderInfo()
order_info_1.setFormalId()
order_info_1.setValue('example order 1', '2017-03-06',
                      'xxx', 200, 'xxx', 'xxx', '进行中')
order_info_2 = OrderInfo()
order_info_2.setFormalId()
order_info_2.setValue('example order 2', '2017-03-06',
                      'xxx', 200, 'xxx', 'xxx', 'Open')
order_info_3 = OrderInfo()
order_info_3.setFormalId()
order_info_3.setValue('example order 3', '2017-03-06',
                      'xxx', 200, 'xxx', 'xxx', 'Open')

order_list_info = OrderListInfo()
order_list_info.addOrderInfo(order_info_1)
order_list_info.addOrderInfo(order_info_2)
order_list_info.addOrderInfo(order_info_3)
##################################
sub_product_1_1 = SubProductInfo()
sub_product_1_1.setFormalId(order_info_1.id)
sub_product_1_1.setValue("上衣", 100, '件', 100, 'xxx')
sub_product_1_2 = SubProductInfo()
sub_product_1_2.setFormalId(order_info_1.id)
sub_product_1_2.setValue("下衣", 100, '件', 100, 'xxx')
sub_product_1_1.addsubProductMaterial('拉链/条',100)
sub_product_1_1.addsubProductMaterial('白布/条',100)
sub_product_1_1.addsubProductMaterial('红布/条',100)
sub_product_1_1.addsubProductMaterial('黑布/条',100)
sub_product_1_2.addsubProductMaterial('拉链/条',100)
sub_product_1_2.addsubProductMaterial('白布/条',100)

sub_product_list = SubProductInfoList()
sub_product_list.addSubProductTitle('xxx')
sub_product_list.addSubProductInfo(sub_product_1_1)
sub_product_list.addSubProductInfo(sub_product_1_2)

##############################################
material_order_list = MaterialOrderInfoList()
material_order_1 = MaterialOrderInfo()
material_order_1.setFormalId(order_info_1.id)

material_sub_order = MaterialSubOrderInfo()
material_sub_order.setFormalId(material_order_1.id)
material_sub_order.setValue('拉链', 100, '条', 10, 'xxx')

material_order_1.addMaterialSubOrder(material_sub_order)
material_order_list.addMaterialOrderInfo(material_order_1)


###########################################
material_stock_1 = MaterialStockInfo()
material_stock_1.setValue('裤头','编号 xxx-xxx', 100, '条', 200)
material_stock_1.setFormalId()

material_stock_list = MaterialStockInfoList()
material_stock_list.addMaterialStockInfo(material_stock_1)