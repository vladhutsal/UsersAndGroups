from django.shortcuts import render, redirect, get_object_or_404

from .models import User, Group

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import (
    UserSerializer,
    GroupSerializer,
    CreateUserSerializer
)


@api_view(['GET'])
def groups_list(request):
    groups_qs = Group.objects.all()
    serialized = GroupSerializer(groups_qs, many=True)

    return Response(serialized.data, status=200)


@api_view(['POST'])
def create_group(request):
    serialized = GroupSerializer(data=request.data)
    if serialized.is_valid(raise_exception=True):
        serialized.save()
        return Response(serialized.data, status=201)

    return Response({}, status=400)


@api_view(['POST'])
def edit_group(request, id):
    group_obj = get_object_or_404(Group, id=id)
    serialized = GroupSerializer(data=request.data)
    if serialized.is_valid(raise_exception=True):
        group_obj.name = serialized.data.get('name')
        group_obj.description = serialized.data.get('description')
        return Response(serialized.data, status=201)

    return Response({'Error'}, status=400)



@api_view(['POST'])
def create_user(request):
    serialized = CreateUserSerializer(data=request.POST)
    print(serialized)
    if serialized.is_valid(raise_exception=True):
        serialized.save()

    return redirect('groups:users_list')


@api_view(['GET'])
def users_list(request):
    users_list = User.objects.all()
    groups = Group.objects.all()

    context = {
        'userlist': users_list,
        'group_query': groups
    }
    return render(request, 'users_list.html', context)


def edit_user(request, username):
    user_obj = get_object_or_404(User, username=username)
    username_form = UserForm(request.POST or None, instance=user_obj)
    group_query = Group.objects.all()
    if username_form.is_valid():
        group_id = request.POST.get('group')
        group = Group.objects.get(pk=group_id)

        user_obj.username = username_form.cleaned_data.get('username')
        user_obj.user_group = group
        user_obj.save()
        return redirect('groups:users_list')

    context = {
        'form': username_form,
        'user_obj': user_obj,
        'group_query': group_query
    }
    return render(request, 'edit_user.html', context)


def delete_user(request, username):
    user_obj = get_object_or_404(User, username=username)
    user_obj.delete()
    return redirect('groups:users_list')


def delete_group(request, groupname):
    group_obj = get_object_or_404(Group, groupname=groupname)
    group_obj.delete()
    return redirect('groups:groups_list')


def home_redirect(request):
    return redirect('groups:users_list')
