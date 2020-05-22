from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/getChart', views.getChart, name='getChart'),
    path('api/post_csv_file', views.post_csv_file, name='post_csv_file'),
]