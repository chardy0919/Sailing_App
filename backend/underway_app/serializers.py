from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import UnderWay
from user_app.serializers import CrewMemberSerializer
from waypoint_app.serializers import WaypointSerializer


class UnderWaySerializer(ModelSerializer):

    def get_crew_information(self, instance):
        crew = instance.crew.all()  # Assuming 'crew' is a ManyToManyField in UnderWay
        return CrewMemberSerializer(crew, many=True).data

    crew_information = serializers.SerializerMethodField(method_name='get_crew_information')

    def get_waypoint_information(self, instance):
        waypoints= instance.waypoints.all()
        return WaypointSerializer(waypoints, many=True).data
    
    waypoint_information = serializers.SerializerMethodField(method_name='get_waypoint_information')

    class Meta:
        model = UnderWay
        fields = [
            "captain",
            "route_name",
            "description",
            "start_date",
            "duration",
            "location",
            "manning",
            "crew",
            "crew_information",
            "waypoints",
            "waypoint_information"
        ]
