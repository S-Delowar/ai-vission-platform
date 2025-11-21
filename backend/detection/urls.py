from django.urls import path

from detection.views import uploadAndDetectView, detectionDetailView


urlpatterns = [
    path('detect/upload/', uploadAndDetectView.as_view(), name='upload-detect'),
    path('detect/upload/<int:pk>/', detectionDetailView.as_view(), name='detection-detail'),
   ]
