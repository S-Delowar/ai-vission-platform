from rest_framework import serializers
from detection.models import ImageUpload, Detection


# ====================
# Detection serializer
# ====================
class DetectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detection
        fields = ["id", "class_name", "confidence", "x_min", "y_min", "x_max", "y_max"]
        
        
# ====================
# Image upload serializer
# ====================
class ImageUploadSerializer(serializers.ModelSerializer):
    detections = DetectionSerializer(many=True, read_only=True)
    class Meta:
        model = ImageUpload
        fields = ["id", "image", "created_at", "annotated", "detections"]
        read_only_fields = ["annotated", "detections", "created_at"]