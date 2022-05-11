from src.models.user.ModelUser import ModelUser
from src.models.hotel.AbstractHotel import AbstractHotel
from src.models.room.AbstractRoom import AbstractRoom
from abc import ABC, abstractmethod
from typing import List
from src.db import db as database
from datetime import date
import json
class ModelHotel(AbstractHotel):
    __tablename__ = "hotel"
    
    id = database.Column(database.Integer, primary_key=True)
    name = database.Column(database.String(20))
    location = database.Column(database.String(20))
    rooms = database.relationship('ModelRoom', backref='hotel', lazy=True)
    room_types = database.relationship('RoomType', backref='hotel')
    owner_id  =  database.Column(database.Integer, database.ForeignKey('user.id'),nullable=False)
    
    
    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def __repr__(self):
        return '<User %r>' % self.username
