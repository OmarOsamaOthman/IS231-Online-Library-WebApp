from django.shortcuts import render,redirect
from django.contrib.auth import login 
from .forms import LoginForm ,SignupForm
from django.contrib.auth.hashers import check_password
# Create your views here.




def index(request):
    return render(request,'pages/index.html',{
        'name':'dalia sami abd el aziz ' ,
        'age':20})

def about(request):
    return render(request,'pages/about.html',{
        'name':'ahmed sami abd el aziz ' ,
        'age':16})

def signup(request):
     if request.method=='POST':
        form=SignupForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('library')
     else :
       form =SignupForm()
     return render(request,'pages/signup.html' , {'lf':form})

def login_view(request):
     if request.method=='POST':
       form=LoginForm(request.POST)
       if form.is_valid():
           form.save()
           return redirect('library')
     else:
         form=LoginForm()
     return render(request,'pages/login.html' , {'lf':form})

def library(request):
     return render(request,'pages/library.html')


def add_book(request):
    return render(request, 'pages/Add-book.html')

def edit_book(request):
    return render(request, 'pages/Edit-book.html')

def books(request):
    return render(request, 'pages/books.html')