from django.shortcuts import render
from .serializers import UnderWaySerializer
from .models import UnderWay
from user_app.views import UserPermissions
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND
)


class StartRoute(UserPermissions):

    def get(self, request, underway_id):
        """Request User gets an underway object data"""
        try:
            underway = UnderWay.objects.get(pk=underway_id)
            serializer = UnderWaySerializer(underway)
            return Response(serializer.data, status=HTTP_200_OK)
        except UnderWay.DoesNotExist:
            return Response("UnderWay not found", status=HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)
        

    def post(self, request):
        """Request User creates an underway object"""
        request.data['captain'] = request.user
        try:
            underway_data = {**request.data}
            underway = UnderWay.objects.create(**underway_data)
            serializer = UnderWaySerializer(underway)
            return Response(UnderWaySerializer(underway).data, status=HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)
    

    def delete(self, request, underway_id):
        """Deletes an underway"""
        try:
            underway = UnderWay.objects.get(pk=underway_id)
            underway.delete()
            return Response("Successfully deleted underway", status=HTTP_204_NO_CONTENT)
        except UnderWay.DoesNotExist:
            return Response("UnderWay not found", status=HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)

class UnderWayCrew(UserPermissions):

    def put(self, request, underway_id):
        """Request User joins matching underway crew"""
        try:
            underway = UnderWay.objects.get(pk=underway_id)
            user = request.user
            if underway.manning > underway.crew.count():
                underway.crew.add(user)
                return Response("User added to the crew successfully", status=HTTP_200_OK)
            else:
                return Response("Manning requirement met")
        except UnderWay.DoesNotExist:
            return Response("UnderWay not found", status=HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)
    

    def delete(self, request, underway_id):
        """Remove member from the crew matching the underway ID"""
        try:
            underway = UnderWay.objects.get(pk=underway_id)
            underway.crew.remove(request.user)
            return Response("Successfully left the crew", status=HTTP_204_NO_CONTENT)
        except UnderWay.DoesNotExist:
            return Response("UnderWay not found", status=HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)
        

class UnderWayWayPoints(UserPermissions):
    
    def put(self, request, underway_id, waypoint_id):
        """Add waypoint to underway matching ID"""
        try:
            underway= UnderWay.objects.get(pk=underway_id)
            underway.waypoints.add(waypoint_id)
            return Response("Successfully added waypoint", status=HTTP_200_OK)
        except UnderWay.DoesNotExist:
            return Response("UnderWay not found", status=HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)
        
    def delete(self, request, underway_id, waypoint_id):
        """Remove waypoint from the list matching the underway ID"""
        try:
            underway = UnderWay.objects.get(pk=underway_id)
            underway.waypoints.remove(waypoint_id)
            return Response("Successfully removed waypoint", status=HTTP_204_NO_CONTENT)
        except UnderWay.DoesNotExist:
            return Response("UnderWay not found", status=HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)