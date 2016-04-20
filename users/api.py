from tastypie.resources import ModelResource
from .models import User

class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resourse_name = 'user'
