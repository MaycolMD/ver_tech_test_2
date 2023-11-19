# app/models.py
from app import db

class SavedQuery(db.Model):
    __tablename__ = 'saved_queries'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))
    user = db.Column(db.String(50))
    comment = db.Column(db.Text)
    query = db.Column(db.Text)
    modified_date = db.Column(db.TIMESTAMP, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

from app import db  # Ajusta según tu estructura de archivos

class SavedComment(db.Model):
    __tablename__ = 'query_comments'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_query = db.Column(db.Integer, db.ForeignKey('saved_queries.id'))
    user = db.Column(db.String(100))  # Ajusta la longitud según tus necesidades
    comment = db.Column(db.Text)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())

    # Definir relación con la tabla SavedQuery
    query = db.relationship('SavedQuery', backref='comments')


