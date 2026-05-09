from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import check_password
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages

from .forms import LoginForm , CreateUserForm, BookForm
from .models import  Profile, Book , BorrowedBook
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
            profile, created = Profile.objects.get_or_create(
                user=user,
                defaults={
                    'role': 'User'
                }
            )

            profile, created = Profile.objects.get_or_create(user=user)

            if profile.role == 'Admin':
                print("Is AN Admin")
                return redirect('books')

            else:
                print("Is User not admin")
                return redirect('books')

        else:
            messages.error(request, 'Invalid username or password')

    return render(request, 'pages/login.html', {'form': form})

def logoutUser(request):
    logout(request)
    User = None
    return redirect('login_view')

def library(request):
     
     profile = None

     if request.user.is_authenticated:
         profile, created = Profile.objects.get_or_create(user=request.user)

     return render(request,'pages/library.html', {'profile': profile})


def add_book(request):
    return render(request, 'pages/Add-book.html')

def edit_book(request):
    form = BookForm
    return render(request, 'pages/Edit-book.html', {'form':form})

def books(request):
    books = Book.objects.all()
    print (books)
    role = Profile.objects.get(user=request.user).role
    return render(request, 'pages/Books.html', {'books': books, 'role': role})


def borrow_book(request, book_id):
    book = Book.objects.get(id=book_id)
    if book.status == 'Available':
        book.status = 'Borrowed'
        book.save()
        BorrowedBook.objects.create(user=request.user, book=book)
        print(f"{request.user.username} borrowed {book.title}")
        return redirect('books')
    else:
        print(f"{book.title} is already borrowed.")
        messages.error(request, 'This book is already borrowed.')
        return redirect('books')
    
    
def update_status(request, book_id):
    book = Book.objects.get(id=book_id)
    if(book.status == 'Available'):
        book.status = 'Borrowed'
        
    else:
        book.status = 'Available'
    book.save()
    print(f"Updated status of {book.title} to {book.status}")
    return redirect('books')    


from django.shortcuts import render, get_object_or_404
def book_detail(request, pk):
    book = get_object_or_404(Book, pk=pk)
    print("book in details....")
    print(book)

    return render(request, 'pages/book-detail.html', {
        'book': book
    })