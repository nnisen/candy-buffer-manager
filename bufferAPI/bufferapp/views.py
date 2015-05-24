from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Product, Category, Customer, Sale
from .transactionHelper import *


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
    data = serializers.serialize("json", [product_item])
    return HttpResponse(data, content_type="application/json")


def catgories(request):
    categories = Category.objects.all()
    data = serializers.serialize("json", categories)
    return HttpResponse(data, content_type="application/json")

def customer(request):
    customer_id = request.GET["customer_id"]
    customer = Customer.objects.get(id=customer_id)
    data = serializers.serialize("json", [customer])
    return HttpResponse(data, content_type="application/json")


def customers(request):
    customers = Customer.objects.all()
    data = serializers.serialize("json", customers)
    return HttpResponse(data, content_type="application/json")


@csrf_exempt
def sales(request):
    return HttpResponse('lol')
    # sales = Sale.objects.all()
    # data = serializers.serialize("json", sales)
    # return HttpResponse(data, content_type="application/json")


@csrf_exempt
def transactions(request):
    if request.method == 'GET':
        return HttpResponse('BadRequest')
    if request.method == 'POST':
        #print(request.body)
        #print(request.body.decode('utf-8'))
        json_data = json.loads(request.body.decode('utf-8'))
        #print('still here 1')
        #transactionhelper
        saveTransactionPost(json_data)
        #print('still here 2')
    return HttpResponse('Done')


@csrf_exempt
def deposit(request):
    if request.method == 'POST':
        json_data = json.loads(request.body.decode('utf-8'))
        #transactionhelper
        makeDeposit(json_data)


    return HttpResponse('Done')
