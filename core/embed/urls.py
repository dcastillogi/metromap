from django.contrib import admin
from django.urls import path
from .views import HolaMundo

urlpatterns = [
    path("hola/", HolaMundo)
]