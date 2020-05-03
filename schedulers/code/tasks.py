from celery import Celery
from celery.schedules import crontab
import requests
import os
import json
import itertools
from helpers import process_cities


app = Celery('tasks', broker=os.environ['CELERY_BROKER'])


params = {
    '$limit': '10000', 
    '$$app_token': os.environ['SODA_TOKEN']
}

URL_API = 'https://www.datos.gov.co/resource/gt2j-8ykr.json'
URL_METADATA = 'https://www.datos.gov.co/api/views/metadata/v1/gt2j-8ykr'
URL_SERVICE = os.environ['URL_SERVICE']


def perform_get(url, params=None):
    try:
        res = requests.get(url, params)
        if res:
            return res.json()
    except requests.exceptions.RequestException as err:
        raise err

def perform_post(url, data=None):
    try:
        res = requests.post(url, json=data)
        if res:
            return res.json()
    except requests.exceptions.RequestException as err:
        print(err)
        raise err
    

def chunk(iterable, size=1000):
    iterator = iter(iterable)
    for element in iterator:
        yield itertools.chain([element], itertools.islice(iterator, size -1))


@app.task(name="get_cities")
def get_cities():
    url = os.environ['URL_API']
    res = perform_get(url, params)
    if res:
        cities = process_cities(res)
        rs = perform_post(URL_SERVICE+'cities/', cities)
        return 'cities added' if rs else 'faile added cities'
    return 'Error from api data'



@app.task(name="get_metadata")
def get_metadata():
    url = os.environ['URL_METADATA']
    res = perform_get(url, params)
    resp1 = perform_post(URL_SERVICE+'metadata', res)
    return 'ok' if resp1 else 'error'    


@app.task(name="get_data_cov")
def get_data_cov():
    responses = []
    url = os.environ['URL_API']
    res = perform_get(url, params)
    if res:
        for data in chunk(res, size=1000):
            post_data = list(data)
            rs = perform_post(URL_SERVICE+'measurements', post_data)
            responses.append(rs) if rs else responses.append(False)
        msg = 'operation ok' if any(responses) else 'failed operation'
        return msg
    return 'Error from api data'


app.conf.beat_schedule = {
    # 'add-metadata-api': {
    #     'task': 'get_metadata',
    #     'schedule': crontab('*/5')
    # },
    # 'add-datacov-api': {
    #     'task': 'get_data_cov',
    #     'schedule': crontab('*/3')
    # },
    'add-cities-api': {
        'task': 'get_cities',
        'schedule': crontab('*/3')
    },
}