from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, CrewMemberSerializer
from .models import User
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
)

        
class Sign_Up(APIView):
    def post(self, request):
        request.data["username"] = request.data["email"]
        user = User.objects.create_user(**request.data)
        print(request.data)
        user_serializer = UserSerializer(data=request.data)

        if user_serializer.is_valid():
            token = Token.objects.create(user=user)

            return Response({
                "email": user.email,
                "token": token.key
            }, status=HTTP_201_CREATED)
        else:
            return Response(user_serializer.errors, status=HTTP_400_BAD_REQUEST)

        
class Log_in(APIView):
    def post(self, request):
        try:
            # email = request.data["email"]
            # password = request.data["password"]
            email = request.data.get("email")
            password = request.data.get("password")
            user = authenticate(email=email, password=password)
            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response({
                    "email": user.email, 
                    "token": token.key                    
                }, status= HTTP_201_CREATED)
            return Response(
                "Something went wrong creating a token", status=HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)
        
class UserPermissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class Info(UserPermissions):
    def get(self, request):
        user = CrewMemberSerializer(request.user)
        return Response(user.data)
    
    # def put(self, request):
    #     user =request.user
    #     serializer = CrewMemberSerializer(user, data=request.data, partial = True)
    #     if serializer.is_valid():
    #         user.save()
    #         return Response(serializer.data)
    #     return Response(user.errors, status=HTTP_400_BAD_REQUEST)

    def put(self, request):
        user = UserSerializer(request.user)
        serializer = user.update(instance=request.user, validated_data=request.data)    
        return Response(CrewMemberSerializer(request.user).data)
 

class Log_out(UserPermissions):
    def post(self, request):
        request.user.auth_token.delete()
        return Response("logged out successfully", status=HTTP_204_NO_CONTENT)


