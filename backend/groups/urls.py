from django.urls import path
from . import views

app_name = 'groups'

urlpatterns = [
    
    path('', views.groups_list),
    path('create', views.create_group),
    path('edit/<int:id>', views.edit_group),
    path('delete/<int:id>', views.delete_group)
]
