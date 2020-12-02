from django.urls import path
from . import views

urlpatterns = [
    path('', views.users_list),
    path('create', views.create_user),
    path('delete/<int:id>', views.delete_user),
    path('edit/<int:id>', views.edit_user)
]
