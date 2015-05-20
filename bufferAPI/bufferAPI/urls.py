from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'bufferapp.views.index'),
    url(r'^back$', 'bufferapp.views.back'),

    url(r'^test$', 'bufferapp.views.test'),
    url(r'^products$', 'bufferapp.views.products'),
    url(r'^categories$', 'bufferapp.views.catgories'),
    url(r'^customers$', 'bufferapp.views.customers'),

    url(r'^bufferapp/', include('bufferapp.urls')),
    url(r'^admin/', include(admin.site.urls)),
    )
