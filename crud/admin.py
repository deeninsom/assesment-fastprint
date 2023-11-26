from django.contrib import admin

# Register your models here.
from .models import Kategori, Status, Produk

admin.site.register(Kategori)
admin.site.register(Status)
admin.site.register(Produk)