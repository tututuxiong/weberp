from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'orders$', views.index, name='index'),
    url(r'app/Orders$', views.orderList),
    url(r'order/[0-9]{1,4}$', views.index, name='index'),
    url(r'app/Orders/(?P<order_id>[0-9]+)$', views.order),
    url(r'app/subProducts$', views.subProductList),
    url(r'app/materialOrders$', views.materialOrderList),
]
