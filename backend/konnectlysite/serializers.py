"""
serializers.py
10/19/2025
Serializes midel data and converts it to JSON for the API
"""

from rest_framework import serializers
from .models import Country, Sectors, InvestmentPathway


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = "__all__"  # Include all fields; adjust if you want specific ones


class SectorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sectors
        fields = "__all__"


class InvestmentPathwaySerializer(serializers.ModelSerializer):
    class Meta:
        model = InvestmentPathway
        fields = "__all__"

