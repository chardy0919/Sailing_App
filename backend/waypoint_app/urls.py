from django.urls import path
from .views import WaypointSearch

urlpatterns = [
    path("<str:location>/", WaypointSearch.as_view(), name="waypoint")  
]