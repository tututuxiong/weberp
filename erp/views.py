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
    elif request.method == 'PUT':
        dict_data = json.loads(request.body.decode())['order']
        tmp_orderInfo = OrderInfo()
        tmp_orderInfo.setJson2Class(dict_data)
        return HttpResponse(addSalerOrder2Sql(tmp_orderInfo).toJson())
    elif request.method == 'DELETE':
        return HttpResponse(deleteSalerOrder2Sql(int(order_id)))
    elif request.method == 'POST':
        return HttpResponse(updateSalerOrder2Sql(tmp_orderInfo).toJson())

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
        print(dict_data)
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
    if request.method == 'GET':
        return  HttpResponse(getMaterialStockFromSql(int(material_id)).toJson())
    if request.method == 'POST':
        dict_data = json.loads(request.body.decode())['materialUpdateInfo']
        tmp_materialUpdateInfo = MaterialUpdateInfo()
        tmp_materialUpdateInfo.setJson2Class(dict_data)
        updateMaterialInfo(tmp_materialUpdateInfo)
        return HttpResponse(tmp_materialUpdateInfo.toJson())

def MaterialTree(request,procurementOrder_id='0',product_id='0'):
    if procurementOrder_id == '0' and product_id == '0':
        return  HttpResponse(getTree().toJson())
    elif procurementOrder_id != '0':
        return  HttpResponse(getTreeByMaterialOrderId(int(procurementOrder_id)).toJson())
    elif product_id != '0':
        return  HttpResponse(getTreeBysubProductId(int(product_id)).toJson())

def NodeInfo(request, node_id):
    if request.method == 'GET':
        return HttpResponse(getNodeInfo(int(node_id)).toJson())
    if request.method == 'PUT':
        dict_data = json.loads(request.body.decode())['node']
        tmp_node = Node("")
        tmp_node.setJson2Class(dict_data)
        return HttpResponse(addNewMaterialNode(tmp_node).toJson())

def LeafInfo(request, leaf_id):
    if request.method == 'GET':
        return HttpResponse(getNodeInfo(int(leaf_id)).toJson())
    if request.method == 'PUT':
        dict_data = json.loads(request.body.decode())['leaf']
        tmp_materialStock = MaterialStockInfo()
        tmp_materialStock.setJson2Class(dict_data)
        return HttpResponse(addNewMaterialLeaf(tmp_materialStock).toJson())        