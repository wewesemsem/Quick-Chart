from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import csv 

def index(request):
    return render(request, "build/index.html")

def getChart(request):
    return HttpResponse("Sending back a chart soon:)")

@api_view(['POST'])
@csrf_exempt
def post_csv_file(request):
    #csv_file_name = request.POST
    #with open(csv_file_name) as user_csv:
        #user_csv_dict = csv_DictReader(user_csv)
        #print("SUCCESS------>",user_csv_dict)
        #for row in user_csv_dict:
            #print(row)
    return HttpResponse("Success")


