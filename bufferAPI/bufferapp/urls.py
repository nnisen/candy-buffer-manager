from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    # /bufferapp
    url(r'^$', views.index, name='index'),
    # url(r'^products/(?P<product_id>[0-9]+)/$', views.products, name='products'),
    # (r'^media/(?P<path>.*)$', 'django.views.static.serve', {
    #     'document_root': settings.MEDIA_ROOT}),
    # ex: /bufferapp/products/5/
    # url(r'^/products/(?P<product_id>[0-9]+)/$', views.products, name='products'),
]
