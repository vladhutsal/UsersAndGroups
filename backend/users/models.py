from django.db import models
from groups.models import Group


class User(models.Model):
    name = models.CharField(max_length=50, unique=True)
    created = models.DateField(auto_now_add=True, auto_now=False)
    group = models.ForeignKey(Group, on_delete=models.PROTECT)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.name
