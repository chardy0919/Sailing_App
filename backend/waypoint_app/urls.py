from django.urls import path
from .views import WaypointSearch, WaypointWeather

urlpatterns = [
    path("<str:location>/", WaypointSearch.as_view(), name="waypoint"),
    path("weather/<int:waypoint_id>/", WaypointWeather.as_view(), name="weather")  
]