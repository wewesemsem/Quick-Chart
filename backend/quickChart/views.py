from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, "build/index.html")

def getChart(request):
    return HttpResponse("Sending back a chart soon:)")