from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return HttpResponse("Sending back html build soon.")

def getChart(request):
    return HttpResponse("Sending back a chart soon:)")