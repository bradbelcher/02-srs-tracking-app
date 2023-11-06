import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here. Ignore vs-code error hinting
# Import models from service_rest, here. Ignore vs-code error hinting
# from service_rest.models import Something


from service_rest.models import AutomobileVO


def autos():
    response = requests.get('http://localhost:8100/api/automobiles/')
    content = json.loads(response.content)
    for auto in content['autos']:
        AutomobileVO.objects.update_or_create(
            defaults={
                "sold": auto['sold'],
                "vin": auto['vin'],
                "id": auto['id']
            }
        )


def poll(repeat=True):
    while True:
        print('Sales poller polling for data')
        try:
            autos()
        except Exception as e:
            print(e, file=sys.stderr)

        if (not repeat):
            break

        time.sleep(60)


if __name__ == "__main__":
    poll()
