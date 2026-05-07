from django.shortcuts import render,redirect
from django.contrib.auth import login 
from .forms import LoginForm ,SignupForm
from .models import Book
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import check_password
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages

from .forms import LoginForm , CreateUserForm
from .models import  Profile
from django.db import transaction


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
    form = CreateUserForm()

    if request.method == "POST":
        form =  CreateUserForm(request.POST)
        if form.is_valid():
            try:

                with transaction.atomic():

                    user = form.save(commit=False)
                    user.save()

                    phone = form.cleaned_data['phone']
                    role = form.cleaned_data['role']

                    Profile.objects.create(
                        user=user,
                        role=role,
                        phone=phone
                    )

                return redirect('login_view')

            except Exception as e:

                form.add_error(None, str(e))
    return render(request,'pages/signup.html' , {'form': form})

def login_view(request):
    form = LoginForm()
    if request.method=='POST':
        form = LoginForm(request.POST)
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request,user)
            profile = Profile.objects.get(user=user)


            profile, created = Profile.objects.get_or_create(user=user)

            if profile.role == 'Admin':
                print("Is AN Admin")
                #return redirect('admin_dashboard')

            else:
                print("Is User not admin")
                #return redirect('library')

        else:
            messages.error(request, 'Invalid username or password')

    return render(request, 'pages/library.html', {'form': form})

    #    form=LoginForm(request.POST)
    #    if form.is_valid():
    #        form.save()
    #        return redirect('library')
    #  else:
    #      form=LoginForm()
    #  return render(request,'pages/login.html' , {'lf':form})



def library(request):
     return render(request,'pages/library.html')


def add_book(request):
    return render(request, 'pages/Add-book.html')

def edit_book(request):
    return render(request, 'pages/Edit-book.html')

def books(request):
    books = Book.objects.all()
    print (books)
    return render(request, 'pages/Books.html', {'books': books})