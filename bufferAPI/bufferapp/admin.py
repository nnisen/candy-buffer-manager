from django.contrib import admin

# Register your models here.
from .models import Customer, Product, Category, Transaction, Sale, TransactionAdmin, CategoryAdmin

admin.site.register(Customer)
admin.site.register(Product)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Sale)
admin.site.register(Transaction, TransactionAdmin)
