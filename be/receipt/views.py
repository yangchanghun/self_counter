from django.shortcuts import render
from .models import Payitem,PayRecord
from product.models import Product
from rest_framework.decorators import api_view
# Create your views here.
from rest_framework.response import Response

@api_view(['POST'])
def cartpay(request):
    data = request.data
    """
       data = [{"id":2,"stock":3}] 
    """
    total_price = 0
    for item in data:
        price = Product.objects.get(id = item["id"]).price * item["stock"]
        total_price += price
    payrecord = PayRecord.objects.create(total_price = total_price)

    for item in data:
        Payitem.objects.create(
            pay = payrecord,
            item = Product.objects.get(id = item["id"]),
            quantity = item["stock"]
        )
    payitemdata = Payitem.objects.filter(pay = payrecord).values()
    return Response({"id":payrecord.id,
                     "total_price":payrecord.total_price,
                     "payitem":payitemdata
                     })



@api_view(['GET'])
def paylist(request):
    records = PayRecord.objects.all().order_by('-created_at')
    data = []

    for record in records:
        items = record.items.all()  # related_name='items' 덕분에 가능
        item_list = []
        for item in items:
            item_list.append({
                "name": item.item.name,
                "price": item.item.price,
                "quantity": item.quantity,
                "category":item.item.category.name
            })

        data.append({
            "id": record.id,
            "created_at": record.created_at.strftime("%Y-%m-%d %H:%M"),
            "total_price": record.total_price,
            "items": item_list
        })

    return Response(data)