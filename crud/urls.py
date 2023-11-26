from django.urls import path
from .views import KategoriListCreateView, KategoriDetailView, ProductListCreateView, ProductDetailView, StatusListCreateView, StatusDetailView

urlpatterns = [
    path('kategori/', KategoriListCreateView.as_view()),
    path('kategori/<int:pk>', KategoriDetailView.as_view()),
    path('product/', ProductListCreateView.as_view()),
    path('product/<int:pk>', ProductDetailView.as_view()),
    path('status/', StatusListCreateView.as_view()),
    path('status/<int:pk>', StatusDetailView.as_view())
]
