from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'orders$', views.index, name='index'),
    url(r'app/Orders$', views.orderList),
    url(r'order/[0-9]{1,4}$', views.index, name='index'),
    url(r'app/Orders/(?P<order_id>[0-9]+)$', views.order),
    url(r'app/orders/(?P<order_id>[0-9]+)/subProducts$', views.subProductList),
    url(r'app/orders/(?P<order_id>[0-9]+)/subProducts/(?P<product_id>[0-9]+)$', views.subProduct),
    url(r'app/orders/(?P<order_id>[0-9]+)/materialOrders$', views.materialOrderList),
    url(r'app/orders/(?P<order_id>[0-9]+)/materialInfos$', views.orderMaterialInfoList),
]
