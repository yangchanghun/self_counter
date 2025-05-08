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

import win32print
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def receipt(request):
    try:
        items = request.data

        if not items:
            return Response({"status": "error", "message": "빈 장바구니"}, status=400)

        # 총액 계산 + 항목 정리
        lines = ["무인 셀프계산대", "===================="]
        total = 0

        for item in items:
            name = item["name"]
            qty = item["stock"]
            price = item["price"]
            line_total = qty * price
            total += line_total
            lines.append(f"{name:<8} x{qty}   {line_total}원")  # 좌측정렬 + 금액 표시

        lines.append("--------------------")
        lines.append(f"합계:{'':>9}{total}원")
        lines.append("\n감사합니다!\n")

        # 프린터 출력
        receipt_text = "\n".join(lines)
        encoded = receipt_text.encode("cp949")  # 한글 깨짐 방지

        printer_name = "SEWOO SLK-TS100"
        hPrinter = win32print.OpenPrinter(printer_name)
        win32print.StartDocPrinter(hPrinter, 1, ("Receipt", None, "RAW"))
        win32print.StartPagePrinter(hPrinter)

        win32print.WritePrinter(hPrinter, b"\x07")           # 삑 소리
        win32print.WritePrinter(hPrinter, encoded)           # 영수증 출력
        win32print.WritePrinter(hPrinter, b"\x1d\x56\x00")   # ✅ 컷 명령 (자동 절단)

        win32print.EndPagePrinter(hPrinter)
        win32print.EndDocPrinter(hPrinter)
        win32print.ClosePrinter(hPrinter)

        return Response({"status": "success", "message": "영수증 출력 완료"})

    except Exception as e:
        print("오류")
        print(str(e))
        return Response({"status": "error", "message": str(e)}, status=500)

