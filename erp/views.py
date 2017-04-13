from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from .orderListInfo import *
from .orderInfo import *

from .subProductInfoList import *
from .subProductInfo import *

from .materialOrderInfo import *
from .materialOrderInfoList import *

from .materialInfoStock import *
from .tree import Leaf, Node

import json
# Create your views here.

from django.contrib.auth.decorators import login_required

#@login_required
def index(request):
    return render(request, 'erp/index.html')

def order(request, order_id):
    if request.method == 'GET':
        return HttpResponse(fetchOrderFromSqlById(int(order_id)).toJson())

def orderList(request):
    return HttpResponse(fetchOrderListFromSql().toJson())

def subProduct(request, product_id):
    subProductI = SubProductInfo()

    if request.method == 'POST':
        dict_data = json.loads(request.body.decode())['product']
        subProductI.setJson2Class(dict_data)
        updateSubProduct2Sql(int(product_id),subProductI)
        return HttpResponse(subProductI.toJson())

    elif request.method == 'PUT':
        dict_data = json.loads(request.body.decode())['product']
        subProductI.setJson2Class(dict_data)
        print(subProductI)
        if subProductI.id == 0:
            addSubProduct2Sql(subProductI)
            return HttpResponse(subProductI.toJson())   

    elif request.method == 'DELETE':
         return HttpResponse(deleteSubProductFromSqlById(int(product_id)))

    elif request.method == 'GET':
         return HttpResponse(getSubProductFromSqlById(int(product_id)).toJson())


def subProductList(request, order_id = '0'):
    if order_id == '0':
        if request.method == 'GET':
            return HttpResponse(getSubProductListFromSqlByOrderId(0).toJson())
    else:
        return HttpResponse(getSubProductListFromSqlByOrderId(int(order_id)).toJson())

def materialOrderList(request, order_id = '0'):
    if order_id == '0':
        return HttpResponse(getMaterialOrderListFromSqlByOrderId(0).toJson())
    else:
        return HttpResponse(getMaterialOrderListFromSqlByOrderId(int(order_id)).toJson())

def materialOrder(request, procurementOrder_id):
    material_order_tmp = MaterialOrderInfo()

    if request.method == 'POST':
        dict_data = json.loads(request.body.decode())['materialOrder']
        material_order_tmp.setJson2Class(dict_data)
        if material_order_tmp.id == int(procurementOrder_id):
            updateMaterialOrder2Sql(material_order_tmp)
            return HttpResponse(material_order_tmp.toJson())

    elif request.method == 'PUT':
        dict_data = json.loads(request.body.decode())['materialOrder']
        material_order_tmp.setJson2Class(dict_data)
        print(material_order_tmp)
        if procurementOrder_id == '0':
            addMaterialOrder2Sql(material_order_tmp)
            return HttpResponse(material_order_tmp.toJson())

    elif request.method == 'DELETE':
        return HttpResponse(delMaterialOrder2Sql(int(procurementOrder_id)))

    elif request.method == 'GET':
        return HttpResponse(getMaterialOrderFromSqlById(int(procurementOrder_id)).toJson())

def materialStockList(request):
    print("fetch materialStockList")
    return  HttpResponse(material_stock_list.toJson())     


def materialStock(request, material_id):
    return  HttpResponse(getMaterialStockFromSql(int(material_id)).toJson())

def tree(request):
    return  HttpResponse(root.toJson())


root = Node("布匹")

node_1 = Leaf("红色尼龙布")
subtree = Node("尼龙布")
subtree.addLeaf(node_1)

subtree1 = Node("桃皮绒")
subtree1_1 = Node("桃皮绒xxx")
node1_1 = Leaf("桃皮绒xxx")
subtree1_1.addLeaf(node1_1)
subtree1.addLeaf(Node("漂白斜纹桃皮绒X"))
subtree1.addSubNode(subtree1_1)
node = Leaf("白布")
root.addLeaf(node)
root.addSubNode(subtree)
root.addSubNode(subtree1)


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
sub_product_1_1.addsubProductMaterial('拉链','条',100)
sub_product_1_1.addsubProductMaterial('白布','条',100)
sub_product_1_1.addsubProductMaterial('红布','条',100)
sub_product_1_1.addsubProductMaterial('黑布','条',100)
sub_product_1_2.addsubProductMaterial('拉链','条',100)
sub_product_1_2.addsubProductMaterial('白布','条',100)

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
material_stock_1.setValue('裤头','xxx-xxx', 100, '条', 200)
material_stock_1.setFormalId()

material_stock_list = MaterialStockInfoList()
material_stock_list.addMaterialStockInfo(material_stock_1)

root.addLeaf(material_stock_1)