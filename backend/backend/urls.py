from django.contrib import admin
from django.urls import path, include
# from users_and_groups import views_group

urlpatterns = [
    path('api/', include('users_and_groups.urls')),
    path('admin/', admin.site.urls),
]
