from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse

from .models import Product, Category, Customer


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
    context = {"product_list": Product.objects.all()}
    return render(request, 'product.html', context)


def categories(request):        
    return JsonResponse({"category_list": Category.objects.all()})
    #return render(request, 'category.html', context)


def customers(request):
    context = {"customer_list": Customer.objects.all()}
    return JsonResponse({"key": "value"})
    #return render(request, 'user.html', context)
