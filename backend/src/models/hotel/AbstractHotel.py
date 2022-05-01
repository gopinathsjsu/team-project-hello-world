from src.models.room.AbstractRoom import AbstractRoom
from abc import ABCMeta,ABC, abstractmethod
from typing import List
from src import db

database = db.get_instance()


class AbstractHotel(database.Model):
    __abstract__ = True
    @abstractmethod
    def getAvailibilityOn(start,end) -> List[AbstractRoom]:
        pass
    
    @abstractmethod
    def getPrice(room: AbstractRoom,start,end,Amenities) -> float:
        pass

    @abstractmethod
    def book(AbstractRoom: AbstractRoom,start,end):
        pass
      