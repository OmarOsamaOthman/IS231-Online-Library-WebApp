from django import forms
from .models import  Signup

class LoginForm(forms.ModelForm):
    class Meta :
        model=Signup
        fields='__all__'
        widgets={
            'password':forms.PasswordInput
        }
    


class SignupForm(forms.ModelForm):
    class Meta :
        model=Signup
        fields='__all__'
        widgets={
            'password':forms.PasswordInput
        }
        initial={
             'email':'Email',
             'Lname':'Last Name',
             'Fname':'First Name'
        }