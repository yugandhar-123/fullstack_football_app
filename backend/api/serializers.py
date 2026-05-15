

from rest_framework import serializers
from .models import *

class CountrySerializers(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ('id', 'name')


class LeagueSerializers(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = ('id', 'name')


class CharacteristicSerializers(serializers.ModelSerializer):
    class Meta:
        model = Characteristic
        fields = ('id', 'name')


class FootballClubSerializers(serializers.ModelSerializer):

    # ✅ Fixed typo: leauge → league (both field name and source)
    league_details = LeagueSerializers(source='league', read_only=True)
    country_details = CountrySerializers(source='country', read_only=True)

    # ✅ Fixed: characteristic_names → characteristics_names
    characteristics_names = serializers.SerializerMethodField()

    class Meta:
        model = FootballClub
        # ✅ Fixed: "__all__" → explicit list so custom fields are included
        fields = [
            'id',
            'name',
            'city',
            'attendance',
            'country',
            'country_details',
            'league',
            'league_details',
            'characteristic',
            'characteristics_names',
            'description'
        ]

    # ✅ Fixed: get_characteristic_names → get_characteristics_names
    def get_characteristics_names(self, obj):
        return [char.name for char in obj.characteristic.all()]