from rest_framework.serializers import ModelSerializer, Serializer
from .models import User

class UserSerializer(Serializer):
    class Meta:
        model = User
        fields = "__all__"

class CrewMemberSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "qualifications"
        ]