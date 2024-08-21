from django.shortcuts import render
from rest_framework import viewsets
from . serializer  import *
from . models import *


class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    

# Create your views here.
