# from .settings import PORTAL_URL

def users_proc(request):
	PORTAL_URL = 'http://' + request.get_host()
	return {'PORTAL_URL': PORTAL_URL}