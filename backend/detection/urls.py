from django.urls import path

from detection.views import ImageUploadView, UploadDetailView


urlpatterns = [
    path('upload/', ImageUploadView.as_view(), name='image-upload'),
    path('upload/<int:pk>/', UploadDetailView.as_view(), name='detection-detail'),
   ]
