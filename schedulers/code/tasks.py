from celery import Celery
from celery.schedules import crontab
import requests
import os

app = Celery('tasks', broker=os.environ['CELERY_BROKER'])


params = {
    '$limit': '5000', 
    '$$app_token': os.environ['SODA_TOKEN']
}

URL_API = 'https://www.datos.gov.co/resource/gt2j-8ykr.json'
URL_METADATA = 'https://www.datos.gov.co/api/views/metadata/v1/gt2j-8ykr'


def perform_get(url, params=None):
    try:
        res = requests.get(url, params)
        if res:
            return res.json()
    except requests.exceptions.RequestException as err:
        raise err
    


@app.task(name="get_metadata")
def get_metadata():
    url = os.environ['URL_METADATA']
    res = perform_get(url, params)
    print(res)

@app.task(name="get_data_cov")
def get_data_cov():
    url = os.environ['URL_API']
    res = perform_get(url, params)
    print(res)


app.conf.beat_schedule = {
    'add-every-1-minute': {
        'task': 'get_metadata',
        'schedule': crontab()
    },
}