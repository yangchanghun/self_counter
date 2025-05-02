from . import views
from django.urls import path

urlpatterns = [
    path('', views.cartpay, name='cartpay'),
    path('list/', views.paylist, name='paylist'),
]