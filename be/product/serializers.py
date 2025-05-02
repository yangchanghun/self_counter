# serializers.py 파일에 추가
from rest_framework import serializers
from .models import Product, Category # models.py에서 만든 Product와 Category 모델 가져오기

class ProductSerializer(serializers.ModelSerializer):
    # category 필드를 정의해서, Category 모델의 name 필드 값을 보여주도록 설정
    # read_only=True는 이 필드가 읽기 전용이라는 뜻이에요. (POST/PUT 요청 시 필요 없음)
    category = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name' # Category 모델에서 name 필드 값을 가져와서 보여줘
    )

    class Meta:
        model = Product # 이 Serializer는 Product 모델을 다룰 거야
        # Product 모델의 어떤 필드를 JSON으로 만들지 정해요.
        # category 필드는 위에서 따로 정의했으니 여기에 포함시켜주기만 하면 돼요.
        fields = ['id', 'name', 'price', 'description', 'product_image', 'barcode_number', 'barcode_image', 'category']
