from django.urls import path

from accounts.views import LoginView, RegisterView


urlpatterns = [
    path('signup/', RegisterView.as_view(), name='signup'),
    path('signin/', LoginView.as_view(), name='signin'),
   ]
