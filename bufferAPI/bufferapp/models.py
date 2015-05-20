from django.db import models

# Create your models here.


class Customer(models.Model):
    username = models.CharField(max_length=200, unique=True)
    balance = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.username


class Product(models.Model):
    name = models.CharField(max_length=100, unique=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    inventory = models.IntegerField()
    image = models.ImageField()

    def __str__(self):
        return self.name


class Transaction(models.Model):
    timestamp = models.DateTimeField(
        auto_now=True,
        auto_now_add=True
    )
    customer = models.ForeignKey(Customer)


class Sale(models.Model):
    price_at_sale_time = models.DecimalField(
        max_digits=5,
        decimal_places=2
    )
    product = models.ForeignKey(Product)
    transaction = models.ForeignKey(Transaction)

    def __str__(self):
        return self.product.name


class Category(models.Model):
    name = models.CharField(max_length=200, unique=True)
    products = models.ManyToManyField(Product)

    def __str__(self):
        return self.name
