from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Profile(models.Model):

    ROLE_CHOICES = [
        ('Admin', 'Admin'),
        ('User', 'User'),
    ]
    address = models.TextField(
    blank=True,
    null=True
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='User'
    )

    phone = models.CharField(max_length=11, blank=True, null=True)

    def __str__(self):
        return self.user.username


# Book Database...
class Book(models.Model):
    status_choices = [
        ('Available', 'Available'),
        ('Borrowed', 'Borrowed'),
    ]
    category_choices = [
    ('trending', 'Trending'),
    ('coding', 'Coding'),
    ('novels', 'Novels'),
    ]
    category = models.CharField(max_length=20, choices=category_choices, default='trending')
    title=models.CharField(max_length=100)
    author=models.CharField(max_length=50)
    description=models.TextField()
    image = models.ImageField(upload_to='book_images/')
    status = models.CharField(max_length=20, choices=status_choices, default='Available')
    def __str__(self):
        return self.title