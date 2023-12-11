from rest_framework.serializers import ModelSerializer, Serializer
from .models import User

class UserSerializer(Serializer):
    class Meta:
        model = User
        fields = "__all__"
    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.qualifications = validated_data.get('qualifications', instance.qualifications)
        instance.save()
        return instance

class CrewMemberSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "qualifications"
        ]