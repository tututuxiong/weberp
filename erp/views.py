from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from .orderListInfo import OrderListInfo
from .orderInfo import OrderInfo

from .subProductInfoList import SubProductInfoList
from .subProductInfo import SubProductInfo

from .materialOrderInfo import MaterialOrderInfo, MaterialSubOrderInfo
from .materialOrderInfoList import MaterialOrderInfoList 


# Create your views here.
def index(request):
    return render(request, 'erp/index.html')

def order(request, order_id):
    order_info_1 = OrderInfo(1, 'example order 1', '2017-03-06', 'xxx', 200, 'xxx', 'xxx', 'Open')
    order_info_2 = OrderInfo(2, 'example order 2', '2017-03-06', 'xxx', 200, 'xxx', 'xxx', 'Open')
    order_info_3 = OrderInfo(3, 'example order 3', '2017-03-06', 'xxx', 200, 'xxx', 'xxx', 'Open')

    return HttpResponse(order_info_1.toJson())


def orderList(request):
    order_info_1 = OrderInfo(1, 'example order 1', '2017-03-06', 'xxx', 200, 'xxx', 'xxx', 'Open')
    order_info_2 = OrderInfo(2, 'example order 2', '2017-03-06', 'xxx', 200, 'xxx', 'xxx', 'Open')
    order_info_3 = OrderInfo(3, 'example order 3', '2017-03-06', 'xxx', 200, 'xxx', 'xxx', 'Open')
    order_list_info = OrderListInfo()
    order_list_info.addOrderInfo(order_info_1)
    order_list_info.addOrderInfo(order_info_2)
    order_list_info.addOrderInfo(order_info_3)
    return HttpResponse(order_list_info.toJson())

def subProductList(request):
    sub_product_1 = SubProductInfo(1, 1, "上衣", 100, '件', 100, 'xxx')
    sub_product_list = SubProductInfoList()
    sub_product_list.addSubProductTitle('xxx')
    sub_product_list.addSubProductInfo(sub_product_1)

    return HttpResponse(sub_product_list.toJson())

def materialOrderList(request):
    material_order_list = MaterialOrderInfoList()
    material_sub_order = MaterialSubOrderInfo(1,'拉链',100,'条',10,1000,'xxx')
    material_order = MaterialOrderInfo(1,'原材料订单1', '2017-3-10', '10000', 'xxxxxxx', 'Open')
    material_order.addMaterialSubOrder(material_sub_order)
    material_order_list.addMaterialOrderInfo(material_order)
    return HttpResponse(material_order_list.toJson()) 

