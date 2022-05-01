from  src.models.hotel.AbstractHotel import AbstractHotel
from src.models.room.AbstractRoom import AbstractRoom

from abc import ABC, abstractmethod
from typing import List
from src import db

database = db.get_instance()
class ModelHotel(AbstractHotel):
    __tablename__ = "hotel"
    
    
    id = database.Column(database.Integer, primary_key=True)
    rooms = db.relationship('room', backref='hotel', lazy=True)

    def getAvailibilityOn(start,end) -> List[AbstractRoom]:
        pass
    
    def getPrice(room: AbstractRoom,start,end,Amenities) -> float:
        pass

    def book(AbstractRoom: AbstractRoom,start,end):
        pass

    def __repr__(self):
        return '<User %r>' % self.username
