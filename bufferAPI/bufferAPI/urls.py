from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'bufferapp.views.index'),
    url(r'^back$', 'bufferapp.views.back'),

    url(r'^test$', 'bufferapp.views.test'),
    url(r'^products$', 'bufferapp.views.products'),
    url(r'^products/(?P<product_id>[0-9]+)/$', 'bufferapp.views.product'),

    url(r'^categories$', 'bufferapp.views.catgories'),

    url(r'^customers$', 'bufferapp.views.customers'),

    url(r'^bufferapp/', include('bufferapp.urls')),
    url(r'^admin/', include(admin.site.urls)),
    ) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
