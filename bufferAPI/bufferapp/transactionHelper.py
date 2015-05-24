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

    for product_id in product_list:
        saleToDb(product_id, new_transaction)

def transactionToDb(transaction):
    pass


def saleToDb(product_id, transaction):
    product = Product.objects.get(id=product_id)
    new_sale = Sale(product=product, price_at_sale_time=product.price)
    new_sale.transaction = transaction
    new_sale.save()
    return new_sale
