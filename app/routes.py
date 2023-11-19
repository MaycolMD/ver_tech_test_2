# app/routes.py
from flask import request, jsonify
from app import app, db
from app.models import SavedQuery, SavedComment

@app.route('/')
def index():
    return '¡Hola, mundo!'

@app.route('/execute_query')
def execute():

    # We get the parameters from the URL
    date = request.args.get('date')
    primary_type = request.args.get('primary_type')
    description = request.args.get('description')
    location_description = request.args.get('location_description')
    arrest = request.args.get('arrest')
    district = request.args.get('district')

    # Creation of the Query, with its parameters (other than None)
    query = "SELECT * FROM chicago_crime WHERE "

    if date:
        query += f"date = '{date}' AND "
    if primary_type:
        query += f"primary_type = '{primary_type}' AND "
    if description:
        query += f"location_description = '{description}' AND "
    if location_description:
        query += f"arrest = {location_description} AND "
    if arrest:
        query += f"arrest = {arrest} AND "
    if district:
        query += f"arrest = {district} AND "

    # Remove the final AND
    query = query.rstrip(' AND ')

    # Execute the query

    return 'Consulta creada!'

@app.route('/query_selected')
def load():

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

@app.route('/save_query')
def create_query():

    nueva_consulta = SavedQuery(
        name='Consulta Importante',
        user='MaycolMD',
        comment='Esta es una consulta interesante',
        query='SELECT * FROM chicago_crime WHERE district = 1',
    )

    db.session.add(nueva_consulta)
    db.session.commit()
    return 'Consulta creada!'

@app.route('/save_comment')
def create_comment():

    nuevo_comentario = SavedComment(
        id_query = 5,
        user='MaycolMD',
        comment='Esta es una consulta interesante',
    )

    db.session.add(nuevo_comentario)
    db.session.commit()
    return 'Comentario creado!'

@app.route('/saved-queries', methods=['GET'])
def show_saved_queries():
    # Obtener todas las consultas guardadas de la base de datos
    all_queries = db.session.query(SavedQuery).all()

    # Formatear los resultados para la respuesta (ajusta según tu modelo)
    queries_data = []
    for query in all_queries:
        queries_data.append({
            'name': query.name,
            'user': query.user,
            'comment': query.comment,
            'query': query.query,
        })

    # Devolver los datos en formato JSON
    return jsonify({'saved_queries': queries_data})


