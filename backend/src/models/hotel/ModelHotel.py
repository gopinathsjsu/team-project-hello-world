from  src.models.hotel.AbstractHotel import AbstractHotel
from abc import ABC, abstractmethod
from typing import List
from src import db

database = db.get_instance()
class ModelHotel(database.Model):
    id = database.Column(database.Integer, primary_key=True)
    def __repr__(self):
        return '<User %r>' % self.username
