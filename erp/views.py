from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from .orderListInfo import OrderListInfo
from .orderInfo import OrderInfo

from .subProductInfoList import SubProductInfoList
from .subProductInfo import SubProductInfo

from .materialOrderInfo import MaterialOrderInfo, MaterialSubOrderInfo
from .materialOrderInfoList import MaterialOrderInfoList

from .subProductMaterialInfo import MaterialInfo, SubProductMaterialInfo

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


def subProductList(request, order_id):
    if request.method == 'GET':
        return HttpResponse(sub_product_list.toJson())


def materialOrderList(request,order_id):
    return HttpResponse(material_order_list.toJson())

def materialOrder(request,order_id,materialOrder_id):
    return HttpResponse(material_order_list.toJson())

def subProductMaterialList(request,order_id,product_id):
    if int(product_id) == 1:
        return HttpResponse(subProductMaterialInfo_1.toJson())
    else:
        return HttpResponse(subProductMaterialInfo_2.toJson())

def subProductMaterial(request,order_id,product_id,material_id):
    errorMessage = '{"value":"ERROR"}'
    scuessfullMessage = '{"value":"OK"}'
    tmp_material = MaterialInfo()
    if request.method == 'POST':
        dict_data = json.loads(request.body.decode())['material']
        tmp_material.setJson2Class(dict_data)
        return httpResponse(scuessfullMessage)
    elif request.method == 'DELETE':
        return httpResponse(scuessfullMessage)
    elif request.method == 'PUT':
        return httpResponse(scuessfullMessage)
    elif request.method == 'GET':
        return httpResponse(materialInfo_1.toJson())

# Stub for test
####################################
order_info_1 = OrderInfo()
order_info_1.setFormalId()
order_info_1.setValue('example order 1', '2017-03-06',
                      'xxx', 200, 'xxx', 'xxx', 'Open')
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

sub_product_list = SubProductInfoList()
sub_product_list.addSubProductTitle('xxx')
sub_product_list.addSubProductInfo(sub_product_1_1)
sub_product_list.addSubProductInfo(sub_product_1_2)

##############################################
material_order_list = MaterialOrderInfoList()
material_order = MaterialOrderInfo()
material_order.setFormalId(order_info_1.id)

material_sub_order = MaterialSubOrderInfo()
material_sub_order.setFormalId(material_order.id)
material_sub_order.setValue('拉链', 100, '条', 10, 'xxx')

material_order.addMaterialSubOrder(material_sub_order)
material_order_list.addMaterialOrderInfo(material_order)

##############################################
materialInfo_1 = MaterialInfo()
materialInfo_1.setValue('拉链',100,'条')
materialInfo_2 = MaterialInfo()
materialInfo_2.setValue('红布',50,'米')
materialInfo_3 = MaterialInfo()
materialInfo_3.setValue('裤头',50,'米')

subProductMaterialInfo_1 = SubProductMaterialInfo()
subProductMaterialInfo_1.setFormalId(order_info_1.id, sub_product_1_1.id)
subProductMaterialInfo_1.addDetailInfo(materialInfo_1)
subProductMaterialInfo_1.addDetailInfo(materialInfo_2)

subProductMaterialInfo_2 = SubProductMaterialInfo()
subProductMaterialInfo_2.setFormalId(order_info_1.id, sub_product_1_2.id)
subProductMaterialInfo_2.addDetailInfo(materialInfo_3)
subProductMaterialInfo_2.addDetailInfo(materialInfo_2)


