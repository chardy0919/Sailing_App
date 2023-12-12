from django.shortcuts import render, get_object_or_404
from .serializers import UnderWaySerializer
from .models import UnderWay
from rest_framework.views import APIView
# from user_app.views import UserPermissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND
)

class UserPermissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class StartRoute(UserPermissions):

    def get(self, request):
        """Request User gets an underway object data"""
        try:
            serializer = UnderWaySerializer(request.user.captain.all(), many=True)
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

    def get(self, request):
        """Request User gets all underway objects with matching id in crew field data"""
        try:
            queryset = UnderWay.objects.filter(crew__contains=request.user.id).values()
            print(queryset)
            serializer = UnderWaySerializer(queryset, many=True)
            return Response(serializer.data, status=HTTP_200_OK)
        except UnderWay.DoesNotExist:
            return Response("UnderWay not found", status=HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)

    def put(self, request, underway_id):
        """Request User joins matching underway crew"""
        underway = get_object_or_404(UnderWay, pk=underway_id)

        # Check if the user is already in the crew
        if request.user in underway.crew.all():
            return Response("User is already in the crew", status=HTTP_400_BAD_REQUEST)

        if underway.manning > underway.crew.count():
            underway.crew.add(request.user)
            return Response("User added to the crew successfully", status=HTTP_200_OK)
        else:
            return Response("Manning requirement met", status=HTTP_400_BAD_REQUEST)
    

    def delete(self, request, underway_id):
        """Remove member from the crew matching the underway ID"""
        try:
            underway = UnderWay.objects.get(id=underway_id)
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
        
class AllUnderways(UserPermissions):

    def get(self, request):
        """Request for all underway data"""
        try:
            underway_crew_objects = UnderWay.objects.exclude(crew =request.user)
            underway_captain_objects = UnderWay.objects.exclude(captain =request.user)
            underway_objects = underway_crew_objects | underway_captain_objects
            serializer = UnderWaySerializer(underway_objects, many=True)
            return Response(serializer.data, status=HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)