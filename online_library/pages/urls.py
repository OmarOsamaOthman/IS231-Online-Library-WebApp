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
    path('borrow/<int:book_id>/', views.borrow_book, name='borrow_book'),
    path('update_status/<int:book_id>/', views.update_status, name='update_status'),
    path('book_detail/<int:pk>/', views.book_detail, name='book_detail'),

    path('book/<int:id>/',views.book_detail,name='book_detail'),
    path('book/<int:id>/borrow/',views.borrow_book,name='borrow_book'),
    path('book/<int:id>/delete/',views.delete_book,name='delete_book'),
    path('book/<int:id>/status/',views.change_status,name='change_status'),
    path('book/<int:id>/edit/',views.edit_book,name='edit_book'),
]