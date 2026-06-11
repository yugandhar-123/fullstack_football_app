
    
    
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