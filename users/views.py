from django.shortcuts import render

from django import forms
from django.views.generic import TemplateView
from djng.forms import NgFormValidationMixin, NgModelFormMixin
from crispy_forms.helper import FormHelper

from .models import User

# Create your views here.

class UserForm(NgModelFormMixin, forms.ModelForm):
    """
    User Form with a little crispy forms added
    """

    def __init__(self, *args, **kwargs):
        super(UserForm, self).__init__(*args, **kwargs)
        setup_bootstrap_helpers(self)

    class Meta:
        model = User
        fields = '__all__'

def setup_bootstrap_helpers(object):
    object.helper = FormHelper()
    object.helper.form_class = 'form-horisontal'
    # object.helper.form_method = 'POST'

    # set form field properties
    object.helper.help_text_inline = True
    object.helper.html5_reqired = True
    object.helper.label_class = 'col-sm-2 control-label'
    object.helper.field_class = 'col-sm-10'

class UserFormView(TemplateView):
    template_name = "Users/new.html"

    def get_context_data(self, **kwargs):
        context = super(UserFormView, self).get_context_data(**kwargs)
        context.update(UserForm=UserForm())
        return context

class IndexView(TemplateView):
    template_name = 'Users/index.html'
