from .models import Product, Category, Customer, Sale, Transaction
from django.http import HttpResponseBadRequest, HttpResponse

def saveTransactionPost(json_data):
    print(json_data)
    #get user
    try:
        input_money = json_data['money']
        customer_id = json_data['customerId']
        purchase_sum = json_data['sum']
        product_list = json_data['products']
    except KeyError:
        return HttpResponseBadRequest("missing field in json")

    try:
        c = Customer.objects.get(id=customer_id)
        new_transaction = Transaction(customer=c)
        new_transaction.save()
        c.make_deposit(input_money)
        c.make_payment(purchase_sum)

        for product_id in product_list:
            saleToDb(product_id, new_transaction)
    except Product.DoesNotExist:
        return HttpResponseBadRequest("wrong prduct id")
    except Customer.DoesNotExist:
        return HttpResponseBadRequest("wrong customer id")

def saleToDb(product_id, transaction):
    product = Product.objects.get(id=product_id)
    new_sale = Sale(product=product, price_at_sale_time=product.price)
    new_sale.transaction = transaction
    new_sale.save()
    product.make_sale()



def makeDeposit(json_data):
    #get user
    try:
        customer_id = json_data['customerId']
        customer = Customer.objects.get(id=customer_id)

        #get money_amount
        input_money = json_data['money']
        #save
        customer.make_deposit(input_money)
    except KeyError:
        return HttpResponseBadRequest("missing field in json")
    except Customer.DoesNotExist:
        return HttpResponseBadRequest("wrong customer id")
