from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.
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
  
  