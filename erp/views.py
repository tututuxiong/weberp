from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from .orderListInfo import OrderListInfo
from .orderInfo import OrderInfo

from .subProductInfoList import SubProductInfoList
from .subProductInfo import SubProductInfo

from .materialOrderInfo import MaterialOrderInfo, MaterialSubOrderInfo
from .materialOrderInfoList import MaterialOrderInfoList 

import json

# Create your views here.
def index(request):
    return render(request, 'erp/index.html')

def order(request, order_id):
    return HttpResponse(order_info_1.toJson())


def orderList(request):
    return HttpResponse(order_list_info.toJson())

def subProduct(request,order_id,product_id):
    if request.method == 'POST':
        print(order_id,product_id)
        received_json_data = json.loads(request.body)
        if received_json_data.id == '-1':
            new_sub_product = SubProductInfo(subProductId + 1, received_json_data.orderId, received_json_data.name, received_json_data.count,received_json_data.unit , received_json_data.price, received_json_data.comment)
            sub_product_list.addSubProductInfo(new_sub_product)
        return HttpResponse("get post request")
    else:
        return HttpResponse(sub_product_1.toJson())

def subProductList(request,order_id):
    return HttpResponse(sub_product_list.toJson())

def materialOrderList(request):
    return HttpResponse(material_order_list.toJson()) 

sub_product_1 = SubProductInfo(1, 1, "上衣", 100, '件', 100, 'xxx')
subProductId = 1
sub_product_list = SubProductInfoList()
sub_product_list.addSubProductTitle('xxx')
sub_product_list.addSubProductInfo(sub_product_1)

material_order_list = MaterialOrderInfoList()
material_sub_order = MaterialSubOrderInfo(1,'拉链',100,'条',10,1000,'xxx')
material_order = MaterialOrderInfo(1,'原材料订单1', '2017-3-10', '10000', 'xxxxxxx', 'Open')
material_order.addMaterialSubOrder(material_sub_order)
material_order_list.addMaterialOrderInfo(material_order)

order_info_1 = OrderInfo(1, 'example order 1', '2017-03-06', 'xxx', 200, 'xxx', 'xxx', 'Open')
order_info_2 = OrderInfo(2, 'example order 2', '2017-03-06', 'xxx', 200, 'xxx', 'xxx', 'Open')
order_info_3 = OrderInfo(3, 'example order 3', '2017-03-06', 'xxx', 200, 'xxx', 'xxx', 'Open')
order_list_info = OrderListInfo()
order_list_info.addOrderInfo(order_info_1)
order_list_info.addOrderInfo(order_info_2)
order_list_info.addOrderInfo(order_info_3)