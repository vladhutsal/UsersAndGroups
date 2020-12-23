from django.db import models


class Group(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(max_length=150, blank=True)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.name


class User(models.Model):
    name = models.CharField(max_length=50, unique=True)
    created = models.DateField(auto_now_add=True, auto_now=False)
    group = models.ForeignKey(Group, on_delete=models.PROTECT)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.name
