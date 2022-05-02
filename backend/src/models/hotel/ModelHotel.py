from  src.models.hotel.AbstractHotel import AbstractHotel
from src.models.room.AbstractRoom import AbstractRoom
from abc import ABC, abstractmethod
from typing import List
from src.db import db as database
from datetime import date

class ModelHotel(AbstractHotel):
    __tablename__ = "hotel"
    
    def __init__(self,id,room) -> None:
        self.id = id
        self.rooms = room
        
    id = database.Column(database.Integer, primary_key=True)
    rooms = database.relationship('ModelRoom', backref='hotel', lazy=True)

    


    
    def getPrice(room: AbstractRoom,start,end,Amenities) -> float:
        pass

    def book(AbstractRoom: AbstractRoom,start,end):
        pass

    def __repr__(self):
        return '<User %r>' % self.username
