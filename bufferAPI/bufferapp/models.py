from django.db import models
from django.contrib import admin
from decimal import Decimal

# Create your models here.


class Customer(models.Model):
    username = models.CharField(max_length=200, unique=True)
    balance = models.DecimalField(max_digits=6, decimal_places=2)

    def make_payment(self, price):
        converted_price = Decimal(price)
        self.balance -= converted_price
        self.save()

    def make_deposit(self, money):
        converted = Decimal(money)
        self.balance += converted
        self.save()

    def __str__(self):
        return self.username


class Category(models.Model):
    name = models.CharField(max_length=200, unique=True)
    # products = models.ManyToManyField(Product)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=100, unique=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    inventory = models.IntegerField()
    image = models.ImageField(upload_to='products')
    categories = models.ManyToManyField(Category)

    def __str__(self):
        return self.name


class Transaction(models.Model):
    timestamp = models.DateTimeField(
        auto_now_add=True
    )
    timestamp.editable = False
    customer = models.ForeignKey(Customer)

    def get_date_string(self):
        DATE_FORMAT = "%Y-%m-%d"
        TIME_FORMAT = "%H:%M:%S"

        if self.timestamp:
            return self.timestamp.strftime("%s %s" %
                (DATE_FORMAT, TIME_FORMAT))

    def __str__(self):
        return "%s, %s" % (self.customer.username, self.get_date_string())


class Sale(models.Model):
    price_at_sale_time = models.DecimalField(
        max_digits=5,
        decimal_places=2
    )
    product = models.ForeignKey(Product)
    transaction = models.ForeignKey(Transaction)

    def __str__(self):
        return self.product.name + ", " + self.transaction.__str__()


class SaleInline(admin.TabularInline):
    model = Sale


class TransactionAdmin(admin.ModelAdmin):
    inlines = [SaleInline, ]
