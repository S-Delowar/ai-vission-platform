from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# ====================
# Uploaded Image
# ====================
class ImageUpload(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="uploads/")
    annotated = models.ImageField(upload_to="annotated/", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
     
# ====================
# Detection object
# ====================    
class Detection(models.Model):
    upload = models.ForeignKey(ImageUpload, related_name="detections", on_delete=models.CASCADE)
    class_name = models.CharField(max_length=128)
    confidence = models.FloatField()
    x_min = models.FloatField()
    y_min = models.FloatField()
    x_max = models.FloatField()
    y_max = models.FloatField()