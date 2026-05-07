from django.db import models
# Create your models here.

class Login (models.Model):
    username=models.CharField(max_length=50)
    password=models.CharField(max_length=50 )#,widget=forms.PasswordInput
    admin = models.BooleanField(default=False)
    def __str__(self):
        return self.username
    

class Signup(models.Model):
    x=[
        ('Admin' , 'Admin'),
        ('User' ,'User' )
    ]
    Fname=models.CharField(max_length=50  )#,initial='FirstName'
    Lname=models.CharField(max_length=50 )#,initial='LastName'
    username=models.CharField(max_length=50 )
    email=models.CharField(max_length=100)#, initial='Email'
    password=models.CharField(max_length=50)# ,widget=forms.PasswordInput,initial='Password'
    role=models.CharField(max_length=20 ,choices=x)
    phone=models.CharField(max_length=11)
    def __str__(self):
        return self.username
    
    


# Book Database...
class Book(models.Model):
    status_choices = [
        ('Available', 'Available'),
        ('Borrowed', 'Borrowed'),
    ]
    title=models.CharField(max_length=100)
    author=models.CharField(max_length=50)
    description=models.TextField()
    image = models.ImageField(upload_to='book_images/')
    status = models.CharField(max_length=20, choices=status_choices, default='Available')
    def __str__(self):
        return self.title