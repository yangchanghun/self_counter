from . import views
from django.urls import path

urlpatterns = [
    path('register/', views.product_register, name='product_register'),
    path('list/', views.product_list, name='product_list'),
    path('search/', views.product_search, name='search'),
    path('detail/', views.product_detail, name='product_detail'),

    path('category/register/', views.category_register, name='product_detail'),
    path('category/list/', views.category_list, name='product_detail'),
    path('category/delete/', views.category_delete, name='product_detail'),
    path('category/update/', views.category_update, name='product_detail'),
]