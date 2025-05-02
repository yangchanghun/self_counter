
from django.db import models
from product.models import Product
class PayRecord(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)  # 결제 일시
    total_price = models.PositiveIntegerField()            # 총 결제 금액
    # method = models.CharField(max_length=20)              # 결제 수단 (예: 카드, 현금)
    # # 필요 시: 사용자 정보, 포인트 사용 등도 추가 가능

    # def __str__(self):
    #     return f"결제번호 {self.id} - {self.created_at.strftime('%Y-%m-%d %H:%M:%S')}"


class Payitem(models.Model):
    pay = models.ForeignKey(PayRecord, on_delete=models.CASCADE, related_name='items')
    item = models.ForeignKey(Product,on_delete=models.CASCADE)              # 상품명


    quantity = models.IntegerField()  

    def __str__(self):
        return f"{self.item.name} × {self.quantity}개"  