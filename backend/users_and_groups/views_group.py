from django.shortcuts import get_object_or_404

from .models import Group
from .serializers import GroupSerializer

from django.db.models import ProtectedError

from rest_framework.decorators import api_view
from rest_framework.response import Response


# def index(request):
#     return render(request, "build/index.html")


@api_view(['GET'])
def groups_list(request):
    groups_qs = Group.objects.all()
    serialized = GroupSerializer(groups_qs, many=True)
    response = {
        'data': serialized.data,
        'message': 'All good'
    }

    return Response(response, status=200)


@api_view(['POST'])
def create_group(request):
    serialized = GroupSerializer(data=request.data)

    if serialized.is_valid(raise_exception=True):
        serialized.save()
        name = serialized.data['name']
        response = {
            'data': serialized.data,
            'message': f'Group with name {name} was created'
        }
        return Response(response, status=201)

    return Response({'message': 'This group already exist'}, status=409)


@api_view(['POST'])
def edit_group(request, id):
    group_obj = get_object_or_404(Group, id=id)
    name = group_obj.name
    serialized = GroupSerializer(group_obj, data=request.data)
    if serialized.is_valid(raise_exception=True):
        serialized.save()
        response = {
            'data': serialized.data,
            'message': f'Group with name {name} was edited'
        }
        return Response(response, status=201)

    return Response({'Error'}, status=400)


@api_view(['DELETE'])
def delete_group(request, id):
    group_obj = get_object_or_404(Group, id=id)
    serialized = GroupSerializer(group_obj)
    data = serialized.data
    try:
        group_obj.delete()
        message = f'Group with name {group_obj.name} was deleted'
        status = 200
    except ProtectedError:
        status = 409
        message = f'Can`t delete non-empty group {group_obj.name}'

    return Response({'message': message, 'data': data}, status=status)
