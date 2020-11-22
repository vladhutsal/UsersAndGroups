from rest_framework import serializers
from .models import User
from groups.models import Group


class CreateUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('name', 'group')


class UserSerializer(serializers.ModelSerializer):
    group_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ('name', 'created', 'group', 'group_name')

    def get_group_name(self, usr_instance):
        group_id = usr_instance.group
        group = Group.objects.get(id=group_id)
        return group.name
