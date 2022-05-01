from  src.models.hotel.AbstractHotel import AbstractHotel
from src.models.room.AbstractRoom import AbstractRoom
from abc import ABC, abstractmethod
from typing import List
from src import db
from datetime import date

database = db.get_instance()
class ModelHotel(AbstractHotel):
    __tablename__ = "hotel"
    
    def __init__(self,id,room) -> None:
        self.id = id
        self.rooms = room
        
    id = database.Column(database.Integer, primary_key=True)
    rooms = database.relationship('room', backref='hotel', lazy=True)

    def getAvailibilityOn(self,start: date,end:date) -> List[AbstractRoom]:
        available_rooms = []
        for r in self.rooms:
            if  r.isAvailableFor(start,end):
                available_rooms.append(r)
        return available_rooms


    
    def getPrice(room: AbstractRoom,start,end,Amenities) -> float:
        pass

    def book(AbstractRoom: AbstractRoom,start,end):
        pass

    def __repr__(self):
        return '<User %r>' % self.username
