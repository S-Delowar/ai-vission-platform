from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

from accounts.serializers import RegisterSerializer

User = get_user_model()

# ====================
# Registration
# ====================
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Generate JWT tokens immediately after registration
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return Response({
            'message': 'Registration successful. Auto logged in now',
            'user': {
                'id': user.id,
                'email': user.email,
                'username': user.username,
            },
            'refresh': str(refresh),
            'access': access_token,
        }, status=status.HTTP_201_CREATED)
    
    
# ====================
# JWT Login View
# ====================
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        
        try:
            user = User.objects.get(email=email)
            if not user.check_password(password):
                return Response({
                    "detail": "Invalid credentials"
                }, status=status.HTTP_401_UNAUTHORIZED)
            
            refresh = RefreshToken.for_user(user)
            return Response({
                'message': 'Login successful.',
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'username': user.username
                },
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        except User.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        
