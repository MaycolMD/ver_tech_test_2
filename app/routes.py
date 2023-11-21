# app/routes.py
from flask import request, jsonify
from app import app, db
from app.models import SavedQuery, SavedComment

import os
from google.cloud import bigquery

import datetime

@app.route('/')
def index():
    return '¡Hola, mundo!'

# Visual query builder
@app.route('/execute_query')
def execute():

    user = request.args.get('user')
    # We get the parameters from the URL
    date = request.args.get('date')
    primary_type = request.args.get('primary_type')
    description = request.args.get('description')
    location_description = request.args.get('location_description')
    arrest = request.args.get('arrest')
    district = request.args.get('district')
    

    # Creation of the Query, with its parameters (other than None)
    query = "SELECT unique_key, date, primary_type, description, location_description, arrest, domestic, district, latitude, longitude FROM `bigquery-public-data.chicago_crime.crime` WHERE "

    if date:
        query += f"DATE(date) = DATE('{date}') AND "
    if primary_type:
        query += f"primary_type = '{primary_type}' AND "
    if description:
        query += f"description = '{description}' AND "
    if location_description:
        query += f"location_description = '{location_description}' AND "
    if arrest:
        query += f"arrest = {arrest} AND "
    if district:
        query += f"district = {district} AND "

    if date == "" and primary_type == "" and description == "" and location_description == "" and arrest == "" and district == "": 
        query = query[: -len(" WHERE ")]

    # Remove the final AND
    query = query.rstrip(' AND ')

    # Reference the SA
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] ='D:/Python/ver/app/key.json'

    # BigQuery client object.
    client = bigquery.Client()

    df_data = client.query(query).result().to_dataframe()

    # Crear un diccionario de mapeo para los nuevos nombres de columna
    nuevos_nombres = {
        'unique_key': 'Unique Key',
        'date': 'Date',
        'primary_type': 'Primary Type',
        'description': 'Description',
        'location_description': 'Location Description',
        'arrest': 'Arrest',
        'domestic': 'Domestic',
        'district': 'District',
        'latitude': 'Latitude',
        'longitude': 'Longitude',
    }

    # Usar el método rename para cambiar los nombres de las columnas
    df_data.rename(columns=nuevos_nombres, inplace=True)

    df_json = df_data.to_json(orient='records')

    return jsonify({'data': df_json})

# Visual query builder
@app.route('/primary_types')
def primary_types():

    # Creation of the Query, with its parameters (other than None)
    query = """ 
                SELECT primary_type
                FROM `bigquery-public-data.chicago_crime.crime`
                group by primary_type
            """
    # Reference the SA
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] ='D:/Python/ver/app/key.json'

    # BigQuery client object.
    client = bigquery.Client()

    df_data = client.query(query).result().to_dataframe()

    df_json = df_data.to_json(orient='records')

    return jsonify({'data': df_json})

# Visual query builder
@app.route('/description_types')
def description_types():

    # Creation of the Query, with its parameters (other than None)
    query = """ 
                SELECT description
                FROM `bigquery-public-data.chicago_crime.crime`
                group by description
            """
    # Reference the SA
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] ='D:/Python/ver/app/key.json'

    # BigQuery client object.
    client = bigquery.Client()

    df_data = client.query(query).result().to_dataframe()

    df_json = df_data.to_json(orient='records')

    return jsonify({'data': df_json})

# Visual query builder
@app.route('/location_types')
def location_types():

    # Creation of the Query, with its parameters (other than None)
    query = """ 
                SELECT location_description
                FROM `bigquery-public-data.chicago_crime.crime`
                group by location_description
            """
    # Reference the SA
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] ='D:/Python/ver/app/key.json'

    # BigQuery client object.
    client = bigquery.Client()

    df_data = client.query(query).result().to_dataframe()

    df_json = df_data.to_json(orient='records')

    return jsonify({'data': df_json})

# Visual query builder
@app.route('/query_year')
def execute_year():

    user = request.args.get('user')
    # We get the parameters from the URL
    date = request.args.get('date')
    primary_type = request.args.get('primary_type')
    description = request.args.get('description')
    location_description = request.args.get('location_description')
    arrest = request.args.get('arrest')
    district = request.args.get('district')

    # Creation of the Query, with its parameters (other than None)
    query = """SELECT year, count(*) as Cuenta FROM `bigquery-public-data.chicago_crime.crime` WHERE """

    if primary_type:
        query += f"primary_type = '{primary_type}' AND "
    if description:
        query += f"description = '{description}' AND "
    if location_description:
        query += f"location_description = '{location_description}' AND "
    if arrest:
        query += f"arrest = {arrest} AND "
    if district:
        query += f"district = {district} AND "

    if primary_type == "" and description == "" and location_description == ""  and arrest == "" and district == "":
        query = query[: -len(" WHERE ")]

    # Remove the final AND
    query = query.rstrip(' AND ')

    query += f"\n group by year \n order by year"
    print(query)
    # Reference the SA
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] ='D:/Python/ver/app/key.json'

    # BigQuery client object.
    client = bigquery.Client()

    df_data = client.query(query).result().to_dataframe()

    df_json = df_data.to_json(orient='records')

    return jsonify({'data': df_json})

# Select Saved Query
@app.route('/query_selected')
def load():

    user = request.args.get('user')
    # Obtener el ID de la consulta desde la URL
    id_query = request.args.get('idQuery')

    # Buscar la consulta en la base de datos por su ID
    selected_query = db.session.query(SavedQuery).filter_by(id=id_query).first()

    if selected_query:
        # Obtener detalles de la consulta
        query_data = {
            'name': selected_query.name,
            'user': selected_query.user,
            'comment': selected_query.comment,
            'query': selected_query.query,
        }

        # Renderizar la plantilla del visual query builder con los detalles de la consulta
        return jsonify({'saved_query': query_data})
    else:
        return 'Consulta no encontrada!'

# Save Query With Name, Username, and Comment 
@app.post('/save_query')
def create_query():

    try:
        # Obtener datos del cuerpo de la solicitud en formato JSON
        data = request.get_json()

        # Aquí puedes hacer lo que necesites con los datos, por ejemplo, almacenarlos en una base de datos
        # Ejemplo de impresión en la consola
        print('Datos recibidos:', data)

        user = data['username']

        name = data['name']
        comment = data['comment']
        query = {
            'date': data['date'],
            'primaryType': data['primaryType'],
            'description': data['description'],
            'location': data['location'],
            'arrest': data['arrest'],
            'district': data['district']
        }

        nueva_consulta = SavedQuery(
        name=name,
        user=user,
        comment=comment,
        query=query,
        )

        db.session.add(nueva_consulta)
        db.session.commit()

        # Devolver una respuesta
        return jsonify({'mensaje': 'Query guardado con éxito'})
    except Exception as e:
        # Manejar cualquier error
        print('Error al procesar la solicitud:', str(e))
        return jsonify({'error': 'Error al procesar la solicitud'}), 500

# Comment on Query
@app.route('/save_comment')
def create_comment():

    user = request.args.get('user')
    
    id_query = request.args.get('id_query')
    comment = request.args.get('comment')

    nuevo_comentario = SavedComment(
        id_query = 5,
        user='MaycolMD',
        comment='Esta es una consulta interesante',
    )

    db.session.add(nuevo_comentario)
    db.session.commit()
    return 'Comentario creado!'

# Show All Saved Queries
@app.route('/saved-queries', methods=['GET'])
def show_saved_queries():
    user = request.args.get('user')
    # Obtener todas las consultas guardadas de la base de datos
    all_queries = db.session.query(SavedQuery).all()

    # Formatear los resultados para la respuesta (ajusta según tu modelo)
    queries_data = []
    for query in all_queries:
        queries_data.append({
            'Nombre': query.name,
            'Usuario': query.user,
            'Comentario': query.comment,
            'Query': query.query,
            'Fecha': query.modified_date
        })

    # Devolver los datos en formato JSON
    return jsonify({'saved_queries': queries_data})

# Show All Saved comments
@app.route('/saved-comments', methods=['GET'])
def show_saved_comments():
    user = request.args.get('user')
    idQuery = request.args.get('idQuery')

    # Obtener todos los comentarios guardados de cierto query en la base de datos
    all_comments = db.session.query(SavedComment).filter_by(id_query=idQuery).all()

    # Formatear los resultados para la respuesta (ajusta según tu modelo)
    comments_data = []
    for query in all_comments:
        comments_data.append({
            'user': query.user,
            'comment': query.comment,
        })

    # Devolver los datos en formato JSON
    return jsonify({'saved_comments': comments_data})


