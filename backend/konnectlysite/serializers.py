"""
serializers.py
10/19/2025
Serializes model data and converts it to JSON for the API
"""

from rest_framework import serializers
from .models import Country


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = "__all__"


"""
More Serializers to be added once Sectors and Investment Pathways are populated
"""
