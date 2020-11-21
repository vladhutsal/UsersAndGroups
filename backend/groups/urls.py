from django.urls import path
from . import views

app_name = 'groups'

urlpatterns = [
    path('api/users/create', views.create_user),
    path('api/groups', views.groups_list),
    path('api/groups/create', views.create_group),
    path("api/groups/edit/<int:id>", views.edit_group),

    path("users/", views.users_list, name="users_list"),
    path("groups/", views.groups_list, name="groups_list"),

    path('groups/create', views.create_group, name='create_group'),

    path("edit_user/<str:username>", views.edit_user, name="edit_user"),
    

    path("delete_user/<str:username>", views.delete_user, name="delete_user"),
    path("delete_group/<str:groupname>", views.delete_group, name="delete_group"),

    path('', views.home_redirect)
]
