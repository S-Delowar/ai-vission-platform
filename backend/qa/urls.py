from django.urls import path
from qa.views import GeminiAQView

urlpatterns = [
    path('qa/', GeminiAQView.as_view(), name='gemini-qa'),
   ]
