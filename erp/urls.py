from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'dashboard$', views.index, name='index'),
    url(r'orders$', views.index, name='index'),
    url(r'materialsStock$', views.index, name='index'),
    url(r'productsStock$', views.index, name='index'),
    url(r'procurement$', views.index, name='index'),
    url(r'order/[0-9]{1,4}$', views.index, name='index'),
    url(r'app/Orders$', views.orderList),
    url(r'app/materialStocks$', views.materialStockList),
    url(r'app/materialStocks/(?P<material_id>[0-9]+)$', views.materialStock),
    url(r'app/Orders/(?P<order_id>[0-9]+)$', views.order),
    url(r'app/procurementOrders$', views.materialOrderList),
    url(r'app/orders/(?P<order_id>[0-9]+)/subProducts$', views.subProductList),
    url(r'app/subProducts$', views.subProductList),
    url(r'app/subProduct/(?P<product_id>[0-9]+)$', views.subProduct),
    url(r'app/subPorduct/(?P<product_id>[0-9]+)/materialTree$', views.MaterialTree),
    #url(r'app/subPorduct/(?P<product_id>[0-9]+)/productTree$', views.productTree),
    url(r'app/orders/(?P<order_id>[0-9]+)/procurementOrders$', views.materialOrderList),
    url(r'app/procurementOrder/(?P<procurementOrder_id>[0-9]+)$', views.materialOrder),
    url(r'app/procurementOrder/(?P<procurementOrder_id>[0-9]+)/materialTree$', views.MaterialTree),
    url(r'app/MaterialTree$', views.MaterialTree),
    url(r'app/ProductTree$', views.productTree),
    url(r'app/node/(?P<node_id>[0-9]+)$', views.NodeInfo),
    url(r'app/leaf/(?P<leaf_id>[0-9]+)$', views.LeafInfo),
]
