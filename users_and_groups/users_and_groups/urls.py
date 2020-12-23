from django.urls import path
from . import views_group
from . import views_user


urlpatterns = [
    path('groups/', views_group.groups_list),
    path('groups/create', views_group.create_group),
    path('groups/edit/<int:id>', views_group.edit_group),
    path('groups/delete/<int:id>', views_group.delete_group),

    path('users/', views_user.users_list),
    path('users/create', views_user.create_user),
    path('users/delete/<int:id>', views_user.delete_user),
    path('users/edit/<int:id>', views_user.edit_user),

    path('', views_group.index)
]
