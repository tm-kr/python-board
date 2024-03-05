from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from board_app import db

class Board(db.Model):
    __tablename__ = 'board'

    board_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    board_title = db.Column(db.String)
    board_contents = db.Column(db.String)
    writer = db.Column(db.String)
    create_date = db.Column(db.Date, default=datetime.now)
    views = db.Column(db.Integer)
