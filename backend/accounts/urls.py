from django.urls import path

from accounts.views import LoginView, RegisterView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('signup/', RegisterView.as_view(), name='signup'),
    path('signin/', LoginView.as_view(), name='signin'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),

   ]
