from django.urls import path 
from . import views

urlpatterns=[
    path('' ,views.library ,name='library'),
    path('index/',views.index ,name='index'),
    path('about/' ,views.about ,name='about'),
    
    path('login/' ,views.login_view ,name='login_view'),
    path('logout/' ,views.logoutUser ,name='logout'),
    path('signup/' ,views.signup ,name='signup'),
    
    path('add_book/' ,views.add_book ,name='add_book'),
    
    path('books/' ,views.books ,name='books'),
    
    path('book/<int:pk>/',views.book_detail,name='book_detail'),
    path('borrow/<int:book_id>/', views.borrow_book, name='borrow_book'),
    path('book/<int:pk>/delete/',views.delete_book,name='delete_book'),
    path('book/<int:pk>/edit/',views.edit_book,name='edit_book'),


    path('update_status/<int:pk>/', views.change_book_status, name='update_status'),
    # path('book/<int:pk>/status/',views.change_book_status,name='change_status'),
    
    # path('borrow/<int:book_id>/', views.borrow_book, name='borrow_book'),
    # path('update_status/<int:book_id>/', views.update_status, name='update_status'),
    # path('book_detail/<int:pk>/', views.book_detail, name='book_detail'),

]