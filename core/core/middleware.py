from django.http import HttpResponseBadRequest

class DomainMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        host = request.get_host()
        if 'embed.metromap.online' in host:
            request.urlconf = 'embed.urls'
        elif 'api.metromap.online' in host:
            request.urlconf = 'api.urls'
        else:
            return HttpResponseBadRequest("Dominio no permitido")

        response = self.get_response(request)
        return response
