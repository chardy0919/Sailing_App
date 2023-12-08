from django.urls import path
from .views import StartRoute, UnderWayCrew, UnderWayWayPoints

urlpatterns = [
    path("", StartRoute.as_view(), name="start_route"),
    path("<int:underway_id>/", StartRoute.as_view(), name="route"),
    path("underway_crew/<int:underway_id>/", UnderWayCrew.as_view(), name="underway_crew"),
    path("<int:underway_id>/underway_waypoints/<int:waypoint_id>/",UnderWayWayPoints.as_view(), name="underway_waypoints")     
]