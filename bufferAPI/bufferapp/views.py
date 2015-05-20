from django.shortcuts import render
from django.http import HttpResponse

from .models import Product

# test page
def test(request):
  return HttpResponse("Yay, test page")

# front page
def index(request):
  return render(request, 'index.html')  
  
# "backend" page
def back(request):
  return render(request, 'back.html')
    
def products(request):
  context = {"product_list" : Product.objects.all()}
  return render(request, 'product.html', context)
