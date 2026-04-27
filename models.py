from django.db import models
# Create your models here.

class Login (models.Model):
    username=models.CharField(max_length=50)
    password=models.CharField(max_length=50 )#,widget=forms.PasswordInput
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