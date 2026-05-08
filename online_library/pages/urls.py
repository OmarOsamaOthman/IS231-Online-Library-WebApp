from django.urls import path 
from . import views

urlpatterns=[
    path('index/',views.index ,name='index'),
    path('about/' ,views.about ,name='about'),
    path('login/' ,views.login_view ,name='login_view'),
    path('logout/' ,views.logoutUser ,name='logout'),
    path('signup/' ,views.signup ,name='signup'),
    path('' ,views.library ,name='library'),
    path('add_book/' ,views.add_book ,name='add_book'),
    path('edit_book/' ,views.edit_book ,name='edit_book'),
    path('books/' ,views.books ,name='books'),
]