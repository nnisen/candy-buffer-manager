from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:

    url(r'^$', 'bufferAPI.views.test'),

    url(r'^$', 'bufferAPI.views.home', name='home'),

    url(r'^bufferapp/', include('bufferapp.urls')),

    url(r'^$', 'bufferapp.views.index'),
    url(r'^back$', 'bufferapp.views.back'),

    url(r'^admin/', include(admin.site.urls)),
)
