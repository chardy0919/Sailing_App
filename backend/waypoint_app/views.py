from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
import requests
from requests_oauthlib import OAuth1
from dotenv import dotenv_values


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