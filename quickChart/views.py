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
    user_chart_data = request.data['AxisOptions'].split(',')
    x_axis = user_chart_data[0]
    y_axis = user_chart_data[1]

    # grab columns
    current_df = pd.read_pickle(user_chart_data[2])
    x_axis_values = list(current_df[x_axis])[1:]
    y_axis_values = list(current_df[y_axis])[1:]

    # make chart
    random_int = random.randrange(7000)
    user_graph_title = 'uploads/userGraph'+str(random_int)+'.png'
    matplotlib.use('agg')
    plt.close('all')
    plt.figure(figsize=(7, 7))
    plt.plot(x_axis_values, y_axis_values)

    # chart labels
    plt.title(y_axis+" vs. "+x_axis)
    plt.xlabel(x_axis)
    plt.ylabel(y_axis)

    plt.savefig('public/'+user_graph_title)

    return Response(user_graph_title, content_type='image/png', status=status.HTTP_201_CREATED)


@api_view(['POST'])
@csrf_exempt
def post_csv_file(request):
    # get csv_file title
    csv_file = request.data['dataFile']
    decoded_file = csv_file.read().decode('utf-8')
    io_string = io.StringIO(decoded_file)

    # read csv_file, create dataframe
    df = pd.read_csv(io_string, header=None, sep='\n')
    df = df[0].str.split(',', expand=True)

    # return column titles, save file
    df.columns = df.iloc[0]

    random_int = random.randrange(7000)
    file_name = 'uploads/'+str(random_int)+'.pkl'
    df.to_pickle(file_name)

    response_arr = list(df.columns.values)
    response_arr.append(file_name)
    response_str = ",".join(str(title) for title in response_arr)
    return HttpResponse(response_str)


@api_view(['POST'])
@csrf_exempt
def post_bar_chart(request):
    user_chart_data = request.data['AxisOptions'].split(',')
    x_axis = user_chart_data[0]
    y_axis = user_chart_data[1]

    # grab columns
    current_df = pd.read_pickle(user_chart_data[2])
    x_axis_values = list(current_df[x_axis])[1:]
    y_axis_values = list(current_df[y_axis])[1:]

    # make chart
    random_int = random.randrange(7000)
    user_graph_title = 'uploads/userGraph'+str(random_int)+'.png'
    matplotlib.use('agg')
    plt.close('all')
    plt.figure(figsize=(7, 7))
    plt.bar(x_axis_values, y_axis_values)

    # chart labels
    plt.title(y_axis+" by "+x_axis)
    plt.xlabel(x_axis)
    plt.ylabel(y_axis)

    plt.savefig('public/'+user_graph_title)

    return Response(user_graph_title, content_type='image/png', status=status.HTTP_201_CREATED)
