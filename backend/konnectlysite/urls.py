"""
URLs.py

"""

from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/countries/", views.CountryListView),
    path("api/countries/<str:country_name>/", views.CountryDetailView),
]
