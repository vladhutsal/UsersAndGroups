from django.db import models


class Group(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(max_length=150, blank=True)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.name
