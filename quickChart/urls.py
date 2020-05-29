from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/post_chart_options', views.post_chart_options, name='post_chart_options'),
    path('api/post_csv_file', views.post_csv_file, name='post_csv_file'),
]