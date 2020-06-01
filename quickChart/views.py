from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
import csv 
import io
import pandas as pd 
import random
import matplotlib
from matplotlib import pyplot as plt

def index(request):
    return render(request, "build/index.html")

@api_view(['POST'])
@csrf_exempt
def post_chart_options(request):
    axis = request.data['AxisOptions'].split(',')
    x_axis = axis[0]
    y_axis = axis[1]

    #grab columns
    current_df = pd.read_pickle('uploads/current_user_df.pkl')
    x_axis_values = list(current_df[x_axis])[1:]
    y_axis_values = list(current_df[y_axis])[1:]

    #make chart
    random_int = random.randrange(7000)
    user_graph_title = 'uploads/userGraph'+str(random_int)+'.png'
    matplotlib.use('agg')
    plt.close('all')
    plt.figure() 
    plt.plot(x_axis_values, y_axis_values)
    plt.savefig('src/'+user_graph_title)
    
    return Response(user_graph_title, content_type='image/png', status=status.HTTP_201_CREATED)

@api_view(['POST'])
@csrf_exempt
def post_csv_file(request):
    #get csv_file title
    csv_file = request.data['dataFile']
    decoded_file = csv_file.read().decode('utf-8')
    io_string = io.StringIO(decoded_file)

    #read csv_file, create dataframe
    df = pd.read_csv(io_string, header=None, sep='\n')
    df = df[0].str.split(',', expand=True)
    
    #return column titles
    df.columns = df.iloc[0]
    df.to_pickle('uploads/current_user_df.pkl')
    column_titles  = list(df.columns.values)
    response_str = ",".join(str(title) for title in column_titles)
    return HttpResponse(response_str)


