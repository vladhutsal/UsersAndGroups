from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import CreateUserSerializer, UserSerializer
from .models import User


@api_view(['GET'])
def users_list(request):
    users_qs = User.objects.all()
    serialized = UserSerializer(users_qs, many=True)

    return Response(serialized.data, status=200)


# @api_view(['POST'])
# def create_user(request):
#     serialized = CreateUserSerializer(data=request.POST)
#     print(serialized)
#     if serialized.is_valid(raise_exception=True):
#         serialized.save()

#     return redirect('groups:users_list')


# def edit_user(request, username):
#     user_obj = get_object_or_404(User, username=username)
#     username_form = UserForm(request.POST or None, instance=user_obj)
#     group_query = Group.objects.all()
#     if username_form.is_valid():
#         group_id = request.POST.get('group')
#         group = Group.objects.get(pk=group_id)

#         user_obj.username = username_form.cleaned_data.get('username')
#         user_obj.user_group = group
#         user_obj.save()
#         return redirect('groups:users_list')

#     context = {
#         'form': username_form,
#         'user_obj': user_obj,
#         'group_query': group_query
#     }
#     return render(request, 'edit_user.html', context)


# def delete_user(request, username):
#     user_obj = get_object_or_404(User, username=username)
#     user_obj.delete()
#     return redirect('groups:users_list')