from .models import Product, Category, Customer, Sale, Transaction


def saveTransactionPost(json_data):
    print(json_data)
    #get user
    input_money = json_data['money']
    customer_id = json_data['customerId']
    purchase_sum = json_data['sum']
    product_list = json_data['products']

    c = Customer.objects.get(id=customer_id)
    new_transaction = Transaction(customer=c)
    new_transaction.save()
    c.make_deposit(input_money)
    c.make_payment(purchase_sum)

    for product_id in product_list:
        saleToDb(product_id, new_transaction)


def saleToDb(product_id, transaction):
    product = Product.objects.get(id=product_id)
    new_sale = Sale(product=product, price_at_sale_time=product.price)
    new_sale.transaction = transaction
    new_sale.save()
    return new_sale


def makeDeposit(json_data):
    #get user
    customer_id = json_data['customerId']
    customer = Customer.objects.get(id=customer_id)

    #get money_amount
    input_money = json_data['money']
    #save
    customer.make_deposit(input_money)
