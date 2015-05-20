from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
	
  url(r'^$', 'bufferapp.views.index'),	
  url(r'^back$', 'bufferapp.views.back'),	
  
  url(r'^test$', 'bufferapp.views.test'),	
  url(r'^products$', 'bufferapp.views.products'),	
  #url(r'^$', 'bufferapp.views.home', name='home'),
	
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
)
