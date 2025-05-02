import qrcode
import json
from .models import Product,Category
from rest_framework.decorators import api_view
import uuid
from django.core.files.base import ContentFile
from io import BytesIO
from rest_framework.response import Response
from rest_framework import status
from .serializers import ProductSerializer
@api_view(['POST'])
def category_register(request):
    try:
        name = request.data.get("name")
        category = Category.objects.create(
            name = name
        )
        return Response({"message":"저장이 완료되었습니다."})
    except Exception as e:
        return Response({"message":str(e)})
    

@api_view(['GET'])
def category_list(request):
    category = Category.objects.all().values()

    return Response({"category":category},status=200)

@api_view(['POST'])
def category_delete(request):
    category_id = request.data.get("id")
    Category.objects.delete(id = category_id)

    return Response({"message":"카테고리가 삭제되었습니다"})

@api_view(['POST'])
def category_update(request):
    category_id = request.data.get("id")
    name = request.data.get("name")
    
    category = Category.objects.get(id = category_id)
    category.name = name
    category.save()

    return Response({"message":"수정되었습니다."})


@api_view(['POST'])
def product_register(request):
    """ 
        body= {
        “name”:string,
        “price”:integer,
        “description”:stirng,
        "product_image":image
        }
    """
    """ 
        body= {
        “name”:string,
        “price”:integer,
        “description”:stirng,
        "product_image":image,
        "barcode_number":interger,
        "barcode_image":"imgae
        }
    """

    category_id = request.data.get("category_id")
    category = Category.objects.get(id = category_id)

    name = request.data["name"]
    price = request.data["price"]
    description = request.data["description"]
    MAX_FILE_SIZE = 800 * 1024  # 800KB = 819200 bytes

    product_image = request.FILES["product_image"]
    print(product_image.size)
    if product_image.size > MAX_FILE_SIZE:
        return Response({"error": "이미지 파일은 800KB 이하만 업로드할 수 있습니다."}, status=400)


    barcode_number = str(uuid.uuid4().int)[:13]
    barcord_number_qr = {
        "barcode_number" : barcode_number
    }

    data = json.dumps(barcord_number_qr, ensure_ascii=False)  # 한글 유지
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )

    qr.add_data(data)
    qr.make(fit=True)

    img = qr.make_image(fill='black', back_color='white')
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    image_file = ContentFile(buffer.getvalue(), name=f"{name}{barcode_number}.png")

    Product.objects.create(
        name = name,
        price = price,
        product_image = product_image,
        description = description,
        barcode_number  =barcode_number,
        barcode_image = image_file,
        category = category
    )

    return Response({
        "message":"등록완",
        "name":name,
        "barcode_number":barcode_number,
        "category":category.name
    },status=201)


@api_view(['GET'])
def product_list(request):
    products = Product.objects.all() # .values() 대신 모델 인스턴스 자체를 가져와요
    
    # ProductSerializer를 사용해서 products 쿼리셋을 JSON 형태로 변환해요.
    # many=True는 여러 개의 객체(쿼리셋)를 다룰 때 필요해요.
    serializer = ProductSerializer(products, many=True)
    
    # serializer.data 안에 변환된 JSON 형태 데이터가 들어있어요.
    return Response({"product": serializer.data}, status=200)



@api_view(['GET'])
def product_detail(request):
    barcode_number = request.GET.get('barcode_number')
    try:
        product = Product.objects.get(barcode_number=barcode_number)
        # 필요한 필드만 추출해서 보내는 게 좋아요
        product_data = {
            "name": product.name,
            "price": product.price,
            "description": product.description,
            "barcode_number": product.barcode_number,
            "barcode_image": product.barcode_image.name if product.barcode_image else None,
            "product_image": product.product_image.name if product.product_image else None,
        }
        return Response({"product": product_data}, status=status.HTTP_200_OK)
    except Product.DoesNotExist:
        return Response({"error": "상품을 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)



@api_view(['GET'])
def product_search(request):
    barcode_number = request.GET.get("barcode_number")

    if not barcode_number:
        return Response({"message":"none barcode_number"},status=401)
    product = Product.objects.filter(barcode_number=barcode_number).values().first()
    """product = {
        "id":2,
        "name":"코카콜라",
        "barcode_number":"123"
    }"""

    if not product:
        return Response({"error": "해당 바코드의 상품이 없습니다."}, status=404)
    
    return Response(product,status=200)


