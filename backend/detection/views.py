from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status, permissions

from detection.models import ImageUpload
from detection.serializers import ImageUploadSerializer
from detection.yolo_utilities.yolo_detection import run_yolo_and_annotate

# ====================
# View- Image Upload and detect
# ====================
class ImageUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [permissions.IsAuthenticated,]
    
    def post(self, request, format=None):
        # Save image
        serializer = ImageUploadSerializer(data=request.data)
        if serializer.is_valid():
            upload = serializer.save(user=request.user)
            
            # run detection
            detections = run_yolo_and_annotate(upload)
            
            # return the serialized upload with detections
            out = ImageUploadSerializer(upload, context={'request': request}).data
            return Response(out, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            

# ====================
# View - Get Image detail
# ====================
class UploadDetailView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, pk):
        try:
            upload = ImageUpload.objects.get(pk=pk, user=request.user)
        except ImageUpload.DoesNotExist:
            return Response(status=404)
        serializer = ImageUploadSerializer(upload, context={'request': request})
        return Response(serializer.data)