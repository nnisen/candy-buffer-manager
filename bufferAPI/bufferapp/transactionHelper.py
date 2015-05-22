from .models import Product, Category, Customer, Sale, Transaction


def saveTransactionPost(json_data):
    print(json_data)
    #get user
    money = json_data['money']
    customer_id = json_data['customerId']
    input_sum = json_data['sum']
    product_list = json_data['products']
    print(money)

    c = Customer.objects.get(id=customer_id)
    new_transaction = Transaction(customer=c)
    new_transaction.save()
    #get timestamp
    #create Transaction
    #get products
    #add sales

def transactionToDb(transaction):
    pass


def saleToDb(sale):
    pass
