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
# def products(request, product_id):
#     return HttpResponse("You're looking at question %s." % product_id)


def test(request):
    return HttpResponse("Yay, test page")

#def index(request):
  #return HttpResponse("Yay, test page")

#def static(request):
  #return render(request, 'static/index.html')


def index(request):
    return render(request, 'index.html')
#context = {'latest_question_list': latest_question_list}


def back(request):
    return render(request, 'back.html')
