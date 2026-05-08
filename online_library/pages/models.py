from django.db import models
from django.contrib.auth.models import User
<<<<<<< HEAD

# Create your models here.

class Profile(models.Model):

=======
# Create your models here.


class Profile(models.Model):

>>>>>>> 0dab6e249bf4928447cc4a1c16d5130d5db62d97
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
<<<<<<< HEAD

=======
>>>>>>> 0dab6e249bf4928447cc4a1c16d5130d5db62d97


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