from src.models.room.AbstractRoom import AbstractRoom
from abc import ABC, abstractmethod
from typing import List


class AbstractHotel(ABC):
    @abstractmethod
    def getAvailibilityOn(start,end) -> List[AbstractRoom]:
        pass
    
    @abstractmethod
    def getPrice(room: AbstractRoom,start,end,Amenities) -> float:
        pass

    @abstractmethod
    def book(AbstractRoom: AbstractRoom,start,end):
        pass
      