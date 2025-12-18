"""
views.py
10/19/2025
Viewing model instances
Kondwani Mtawali
"""

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Country
from .serializers import CountrySerializer


@api_view(["GET"])
def CountryListView(request):
    """
    Returns all countries for map coloring
    """
    countries = Country.objects.all()
    serializer = CountrySerializer(countries, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def CountryDetailView(request, country_name):
    """
    Returns detailed information of a single country. Used when user clicks on country and opens modal.
    """
    country = Country.objects.get(name__iexact=country_name)
    serializer = CountrySerializer(country)
    return Response(serializer.data)


"""
More views to be added once Serializers are set up
"""
