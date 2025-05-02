from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=20)
    def __str__(self):
        return self.name
    
class Product(models.Model):
    name = models.CharField(max_length=20)
    price = models.IntegerField()
    description = models.TextField()
    product_image = models.ImageField(upload_to='product_image/')
    barcode_number = models.CharField(max_length=30)
    barcode_image = models.ImageField(upload_to='barcode_image/')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name