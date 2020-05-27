from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import csv 
import io
import pandas as pd 

def index(request):
    return render(request, "build/index.html")

def getChart(request):
    return HttpResponse("Sending back a chart soon:)")

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
    column_titles  = list(df.columns.values)
    response_str = ",".join(str(title) for title in column_titles)
    return HttpResponse(response_str)


