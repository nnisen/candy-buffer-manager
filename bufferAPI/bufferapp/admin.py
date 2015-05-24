from django.contrib import admin

# Register your models here.
from .models import Customer, Product, Category, Transaction, Sale, TransactionAdmin

admin.site.register(Customer)
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Sale)
admin.site.register(Transaction, TransactionAdmin)
