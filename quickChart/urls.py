from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/post_line_graph', views.post_line_graph,
         name='post_line_graph'),
    path('api/post_csv_file', views.post_csv_file, name='post_csv_file'),
    path('api/post_bar_chart', views.post_bar_chart, name='post_bar_chart'),
    path('api/post_pie_chart', views.post_pie_chart, name='post_pie_chart'),
    path('api/post_histogram', views.post_histogram, name='post_histogram')
]
