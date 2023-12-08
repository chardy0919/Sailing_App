from rest_framework.serializers import ModelSerializer
from .models import WayPoint

class WaypointSerializer(ModelSerializer):
    class Meta:
        model= WayPoint
        fields= "__all__"