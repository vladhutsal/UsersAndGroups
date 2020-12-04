from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import User


@api_view(['GET'])
def users_list(request):
    users_qs = User.objects.all()
    serialized = UserSerializer(users_qs, many=True)

    return Response(serialized.data, status=200)


@api_view(['POST'])
def create_user(request):
    serialized = UserSerializer(data=request.data)
    
    if serialized.is_valid(raise_exception=True):
        serialized.save()

    return Response(serialized.data, status=201)


@api_view(['DELETE'])
def delete_user(request, id):
    user_obj = get_object_or_404(User, id=id)
    user_obj.delete()

    serialized = UserSerializer(user_obj)
    response = {
        'data': serialized.data,
        'message': f'User with id {id} was deleted'
    }
    return Response(response, status=200)


@api_view(['POST'])
def edit_user(request, id):
    user_obj = get_object_or_404(User, id=id)
    serialized = UserSerializer(user_obj, request.data)

    if serialized.is_valid(raise_exception=True):
        serialized.save()
        return Response(serialized.data, status=201)

    return Response({'message': 'Something went wrong'}, status=500)
