

def process_cities(data):
    city_list = list(map(
        lambda doc: {
            'cuidad': doc['ciudad_de_ubicaci_n'], 
            'depto': doc['departamento']
        },
        data)
    )
    return [dict(t) for t in { tuple(d.items()) for d in city_list }]