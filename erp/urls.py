from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'orders$', views.index, name='index'),
    url(r'order/[0-9]{1,4}$', views.index, name='index'),
]
