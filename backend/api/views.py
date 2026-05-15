
# from urllib import request

# from django.shortcuts import render
# from rest_framework import viewsets, permissions
# from .serializers import *
# from .models import *
# from rest_framework.response import Response


# # Country Viewset
# class CountryViewset(viewsets.ViewSet):
#     permission_classes = [permissions.AllowAny]
#     queryset = Country.objects.all()
#     serializer_class = CountrySerializers

#     def list(self, request):
#         queryset = Country.objects.all()
#         serializer = self.serializer_class(queryset, many=True)
#         return Response(serializer.data)


# # League Viewset
# class LeagueViewset(viewsets.ViewSet):
#     permission_classes = [permissions.AllowAny]
#     queryset = League.objects.all()
#     serializer_class = LeagueSerializers

#     def list(self, request):
#         queryset = League.objects.all()
#         serializer = self.serializer_class(queryset, many=True)
#         return Response(serializer.data)


# # Characteristic Viewset
# class CharacteristViewset(viewsets.ViewSet):
#     permission_classes = [permissions.AllowAny]
#     queryset = Characteristic.objects.all()
#     serializer_class = CharacteristicSerializers

#     def list(self, request):
#         queryset = Characteristic.objects.all()
#         serializer = self.serializer_class(queryset, many=True)
#         return Response(serializer.data)


# # Football Club Viewset
# class FootballClubViewset(viewsets.ViewSet):
#     permission_classes = [permissions.AllowAny]
#     queryset = FootballClub.objects.all()
#     serializer_class = FootballClubSerializers

#     # GET Method
#     def list(self, request):
#         queryset = FootballClub.objects.all()
#         serializer = self.serializer_class(queryset, many=True)
#         return Response(serializer.data)

#     # POST Method
#     def create(self, request):

#         print(request.data)

#         serializer = self.serializer_class(data=request.data)

#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)

#         print(serializer.errors)

#         return Response(serializer.errors, status=400)
    
    
#     def retrieve(self, request, pk=None):
#         queryset = self.queryset.get(pk=pk)
#         serializer = self.serializer_class(queryset)
        
#         return Response(serializer.data)
#     def update(self, request, pk=None):
#         queryset = self.queryset.get(pk=pk)
#         serializer = self.serializer_class(queryset, data=request.data)
        
        
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)

#         print(serializer.errors)

#         return Response(serializer.errors, status=400)
    
    
    
#     def destroy(self, request, pk=None):
#         queryset = self.queryset.get(pk=pk)
#         queryset.delete()
#         return Response(status=204)
    
    
    
    
    
from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import *
from .models import *


class CountryViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        queryset = Country.objects.all()
        serializer = CountrySerializers(queryset, many=True)
        return Response(serializer.data)


class LeagueViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        queryset = League.objects.all()
        serializer = LeagueSerializers(queryset, many=True)
        return Response(serializer.data)


class CharacteristViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        queryset = Characteristic.objects.all()
        serializer = CharacteristicSerializers(queryset, many=True)
        return Response(serializer.data)


class FootballClubViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        queryset = FootballClub.objects.all()
        serializer = FootballClubSerializers(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = FootballClubSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        print(serializer.errors)
        return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        try:
            # ✅ Fresh query, not self.queryset
            club = FootballClub.objects.get(pk=pk)
        except FootballClub.DoesNotExist:
            return Response({"error": "Club not found"}, status=404)
        serializer = FootballClubSerializers(club)
        return Response(serializer.data)

    def update(self, request, pk=None):
        try:
            # ✅ Fresh query, not self.queryset
            club = FootballClub.objects.get(pk=pk)
        except FootballClub.DoesNotExist:
            return Response({"error": "Club not found"}, status=404)
        serializer = FootballClubSerializers(club, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print(serializer.errors)
        return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        try:
            # ✅ Fresh query + proper 404 handling
            club = FootballClub.objects.get(pk=pk)
        except FootballClub.DoesNotExist:
            return Response({"error": "Club not found"}, status=404)
        club.delete()
        return Response(status=204)