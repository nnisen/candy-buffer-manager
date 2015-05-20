from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core import serializers

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


def product(request, product_id):
    # response = "You're looking at the results of question %s."
    product_item = Product.objects.get(id=product_id)
    return JsonResponse({'product': product_item.name})


def catgories(request):
    categories = Category.objects.all()
    data = serializers.serialize("json", categories)
    return HttpResponse(data, content_type="application/json")


def customers(request):
    context = {"customer_list": Customer.objects.all()}
    return render(request, 'user.html', context)
