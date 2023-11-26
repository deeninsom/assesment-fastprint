from rest_framework import serializers
from .models import Kategori, Produk, Status

class KategoriModelSerializer(serializers.ModelSerializer):
  class Meta:
    model = Kategori
    fields = '__all__'

class ProdukModelSerializer(serializers.ModelSerializer):
  class Meta:
    model = Produk
    fields = '__all__'

    def validate_harga(self, value):
        try:
            float(value)
            return value
        except ValueError:
            raise serializers.ValidationError("Harga harus berupa angka atau float.")

class StatusModelSerializer(serializers.ModelSerializer):
  class Meta:
    model = Status
    fields = '__all__'