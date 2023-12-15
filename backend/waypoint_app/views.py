from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
import requests
from requests_oauthlib import OAuth1
from dotenv import dotenv_values
from .models import WayPoint


# def index(request):
#     return HttpResponse("Index Page", status=200)

class WaypointSearch(APIView):
    
    def get(self, request, location):

        endpoint = f"https://port-api.com/seaport/search/{location}/"
        response = requests.get(endpoint)
        responseJSON = response.json()

        waypoints = []

        for feature in responseJSON.get('features', []):

            lat = feature['geometry']['coordinates'][1]
            lng = feature['geometry']['coordinates'][0]
            port_name = feature['properties']['name']
            region_name=None
            if (feature['properties']['region']):
                region_name = feature['properties']['region']['name']
            country_name = feature['properties']['country']['name']

            waypoint = {
                'port_name': port_name,
                'region': region_name,
                'country_name': country_name,
                'lat': lat,
                'lng': lng,
            }

            waypoints.append(waypoint)

        print("Waypoints:", waypoints)

        return Response(("Waypoints:", waypoints))

class WaypointWeather(APIView):
#     def get(self, request, waypoint_id):

#         waypoint_obj= WayPoint.objects.get(id=waypoint_id)

#         env =   dotenv_values(".env")
#         key = env.get('STORMGLASSKEY')

#         response = requests.get(
#             'https://api.stormglass.io/v2/weather/point',
#             params={
#                 'lat': waypoint_obj.lat,
#                 'lng': waypoint_obj.lng,
#                 'params': ','.join([
#                     'visibility',
#                     'windDirection',
#                     'windSpeed',
#                     'gust',
#                     'airTemperature',
#                     'waterTemperature',
#                     'waveHeight',
#                     'swellHeight',
#                     'swellDirection',
#                     ])
#             },
#             headers={
#                 'Authorization': key
#             }
#         )
#         json_data = response.json()
#         return Response(json_data)
    

    def get(self, request, waypoint_id):

        waypoint_obj= WayPoint.objects.get(id=waypoint_id)

        response = requests.get(f'https://api.open-meteo.com/v1/forecast?latitude={waypoint_obj.lat}&longitude={waypoint_obj.lng}&current=temperature_2m,precipitation,wind_speed_10m,wind_direction_10m,wind_gusts_10m&wind_speed_unit=kn&forecast_days=1')

        json_data = response.json()
      
        return Response(json_data['current'])
    