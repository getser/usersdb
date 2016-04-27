from tastypie.constants import ALL
from tastypie.authentication import Authentication
from tastypie.authorization import Authorization
from tastypie.resources import ModelResource
from .models import User as Us

class UserResource(ModelResource):
    class Meta:
        queryset = Us.objects.all()
        resourse_name = 'user'
        allowed_methods = ['get', 'post', 'put', 'delete']
        authentication = Authentication()
        authorization = Authorization()
        filtering = {
            'id': ALL,
            'last_name': ALL,
        }
