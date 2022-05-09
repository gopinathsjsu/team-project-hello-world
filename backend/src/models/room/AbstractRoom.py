from abc import ABC, abstractmethod
from src.db import db


class AbstractRoom(db.Model):
    __abstract__ = True
    def isAvailableFor(self,start,end):
        for b in self.bookings:
            if (b.start_date >= start and b.start_date <= end) or (b.end_date >= start and b.end_date <= end):
                return False
        return True
    
    @abstractmethod
    def  getPrice(self):
        pass

    @abstractmethod 
    def bookFor(start,end):
        pass


    