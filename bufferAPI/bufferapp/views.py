from django.shortcuts import render
from django.http import HttpResponse

from .models import Product

# Create your views here.
def products(request, product_id):


    return HttpResponse("You're looking at product %s." % product_id)


def index(request):
    products = Product.objects.all()
    return HttpResponse(products)
    # return HttpResponse("Hello, world. You're at the polls index.")
