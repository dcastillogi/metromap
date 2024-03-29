from django.http import JsonResponse
from api.models import Line, Station, User


def secret_authentication(fn, request, credits, line=None, station=None):
    """
    Checks whether a valid secret-key is received and, 
    if so, verifies whether the user has enough credits 
    to perform the requested action. If the user has 
    enough credits, the function subtracts the credits 
    consumed by the request from the user's credit balance.

    Parameters:
        fn (f)
            Function to execute after authentication
        secret (str)
            The secret-key received in request
        credits (double)
            The number of credits consumed by the specific 
            request

    Returns:
        Returns an error if the user does not have enough 
        credits or if the secret-key is incorrect. Otherwise, 
        it calls fn
    """
    # Get secret-key from headers
    secret = request.META.get("HTTP_SECRET_KEY")
    if (secret == None):
        return JsonResponse({'status': 'error', 'error': 'invalid_client_credentials', 'description': 'secret-key not received', }, status=401)

    # Find the user who made the request
    user = User.objects.filter(secret_key=secret).first()

    # Check if user exists
    if user == None:
        return JsonResponse({'status': 'error', 'error': 'not_found', 'description': 'user not found', }, status=403)

    # Check if user has enough credits
    if user.credits < credits:
        return JsonResponse({'status': 'error', 'error': 'invalid_client_credentials', 'description': 'not enough credits', }, status=403)

    if line:
        try:
            line = Line.objects.get(pk=line)
        except Line.DoesNotExist:
            return JsonResponse({'status': 'error', 'error': 'not_found', 'description': 'line not found', }, status=404)
        if station:
            station = Station.objects.filter(
                station=station, line=line).first()
            if not station:
                return JsonResponse({'status': 'error', 'error': 'not_found', 'description': 'station not found'}, status=404)

    # Take credits from user
    user.credits -= credits
    user.save()
    return fn(line, station, request.GET)
