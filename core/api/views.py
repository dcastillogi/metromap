from django.http import JsonResponse
from api.controllers.incident_controller import Incidents
from api.controllers.data_controller import Data
from api.controllers.status_controller import Status
from api.controllers.user_controller import UserCredentials

"""
# Create your views here.
def get_tweets_endpoint(request):
    # Se llama y alamacena la funcion para obtener los tweets
    tweets = SNT.gettweets()
    # Transforma el diccionario en un JSON, permitiendo emojies
    return JsonResponse(tweets, safe=False, json_dumps_params={'ensure_ascii': False})
"""


def get_status(line, station, GET):
    status = Status(line, station)
    return JsonResponse({'status': 'ok', 'data': status.get_data()})


def get_data(line, station, GET):
    data = Data(line, station)
    return JsonResponse({'status': 'ok', 'data': data.get_data()})


def get_incident(line, station, GET):
    incident = Incidents(line, station, GET)
    return JsonResponse({'status': 'ok', 'data': incident.get_data()})

def user(request, type, userID):
    allowed_domains = request.GET.get('allowed_domains', None)
    user = UserCredentials(userID, allowed_domains)
    if type == "set":
        return user.set()
    if type == "get":
        return user.get()
    if type == "update":
        return user.update()
    else:
        return JsonResponse({'status': 'error', 'error': 'not_found',
                             'description': 'not valid method'}, status=404)
