"""
views.py
10/19/2025
Viewing model instances
Kondwani Mtawali
"""

from rest_framework import generics
from .models import Country, Sectors, InvestmentPathway
from .serializers import (
    CountrySerializer,
    SectorsSerializer,
    InvestmentPathwaySerializer,
)


class CountryListView(generics.ListAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer


class CountryDetailView(generics.RetrieveAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    lookup_field = "id"  # Use 'id' or another unique field


class SectorsListView(generics.ListAPIView):
    queryset = Sectors.objects.all()
    serializer_class = SectorsSerializer


class SectorsDetailView(generics.RetrieveAPIView):
    queryset = Sectors.objects.all()
    serializer_class = SectorsSerializer
    lookup_field = "id"


class InvestmentPathwayListView(generics.ListAPIView):
    queryset = InvestmentPathway.objects.all()
    serializer_class = InvestmentPathwaySerializer


class InvestmentPathwayDetailView(generics.RetrieveAPIView):
    queryset = InvestmentPathway.objects.all()
    serializer_class = InvestmentPathwaySerializer
    lookup_field = "id"

