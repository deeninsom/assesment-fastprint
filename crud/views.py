from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .models import Kategori, Produk, Status
from .serializers import KategoriModelSerializer, ProdukModelSerializer, StatusModelSerializer
# Create your views here.

class KategoriListCreateView(generics.ListCreateAPIView):
    queryset = Kategori.objects.all()
    serializer_class = KategoriModelSerializer

class KategoriDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Kategori.objects.all()
    serializer_class = KategoriModelSerializer

class ProductListCreateView(generics.ListCreateAPIView):
    serializer_class = ProdukModelSerializer

    def get_queryset(self):
        queryset = Produk.objects.filter(status_id=1)
        return queryset

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Produk.objects.all()
    serializer_class = ProdukModelSerializer

class StatusListCreateView(generics.ListCreateAPIView):
    queryset = Status.objects.all()
    serializer_class = StatusModelSerializer

class StatusDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Status.objects.all()
    serializer_class = StatusModelSerializer
