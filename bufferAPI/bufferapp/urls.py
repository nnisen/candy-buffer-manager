from django.conf.urls import url

from . import views

urlpatterns = [
    # /bufferapp
    url(r'^$', views.index, name='index'),
    # url(r'^products/(?P<product_id>[0-9]+)/$', views.products, name='products'),

    # ex: /bufferapp/products/5/
    # url(r'^/products/(?P<product_id>[0-9]+)/$', views.products, name='products'),
]
