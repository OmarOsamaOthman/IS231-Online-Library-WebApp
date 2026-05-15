from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import  Profile, Book



class CreateUserForm(UserCreationForm):
    role = forms.ChoiceField(
        choices=[
            ('User', 'User'),
            ('Admin', 'Admin'),
    
        ],initial='User'
    ) 
    
    phone = forms.CharField(
        max_length=11,
        widget=forms.TextInput(attrs={
        'id':'Phone'
        })    
    )
    class Meta:
        model = User
        fields = ['first_name','last_name','username','email', 'password1', 'password2' ]
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['first_name'].widget.attrs.update({'id': 'UserName', 'autofocus':True})
        self.fields['last_name'].widget.attrs.update({'id': 'lastName'})
        self.fields['username'].widget.attrs.update({'id': 'userName'})
        self.fields['email'].widget.attrs.update({'id': 'Email'})
        self.fields['password1'].widget.attrs.update({'id': 'Password'})
        self.fields['password2'].widget.attrs.update({'id': 'Password'})

class LoginForm(forms.Form):
    username = forms.CharField(
        max_length=100,
        widget=forms.TextInput(attrs={
            'placeholder': 'Username',
            'id':'UserName',
            'autofocus':True,
        })
    )

    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'placeholder': 'Password',
            'id':'Password'
        })
    )


class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ['title','author','category','description','status','cover']


        widgets = {
                    'title': forms.TextInput(attrs={'class': 'input', 'id':'book-title'}),
                    'author': forms.TextInput(attrs={'class': 'input', 'id':'auther'}),
                    'description': forms.Textarea(attrs={'class': 'textarea', 'id':'description'}),
                    'category': forms.Select(attrs={'class': 'select', 'id':'category'}),
                    'status': forms.Select(attrs={'class': 'select','id':'status' }),
                    'cover': forms.ClearableFileInput(attrs={'class': 'file', 'id':'book-image'}),}

        labels = {
        'title': 'Title',
        'author': 'Writer Name',
        'category': 'Category',
        'description':'Description',
        'status':'Status',
        'cover':'Book Cover',
        }