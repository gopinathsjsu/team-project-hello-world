from src.models.room.AbstractRoom import AbstractRoom
from src.models.booking.AbstractBooking import AbstractBooking

from abc import ABCMeta,ABC, abstractmethod
from typing import List
from src import db
from datetime import date

database = db.get_instance()


class AbstractHotel(database.Model):
    __abstract__ = True
    def getAvailibilityOn(self,start: date,end:date) -> List[AbstractRoom]:
        available_rooms = []
        for r in self.rooms:
            if  r.isAvailableFor(start,end):
                available_rooms.append(r)
        return available_rooms
    
    @abstractmethod
    def getPrice(room: AbstractRoom,start,end,Amenities) -> float:
        pass

    @abstractmethod
    def book(room: AbstractRoom,start,end):
        pass
        