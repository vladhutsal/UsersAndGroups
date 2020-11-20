from rest_framework import serializers
from .models import User, Group


class CreateUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['name', 'group']


class UserSerializer(serializers.ModelSerializer):
    group_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['name', 'created', 'group', 'group_name']

    def get_group_name(self, obj):
        group_id = obj.user_group
        group = Group.objects.get(id=group_id)
        return group.groupname


class GroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = Group
        fields = ['name', 'description']
