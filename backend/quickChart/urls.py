from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/getChart', views.getChart, name='getChart')
]