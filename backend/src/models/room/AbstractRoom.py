from abc import ABC, abstractmethod
from datetime import date
from src.models.booking.ModelBooking import ModelBooking
from src.db import db


class AbstractRoom(db.Model):
    __abstract__ = True
    def isAvailableFor(self,start:date,end):
        for b in self.bookings:
            if (b.start_date >= start and b.start_date <= end) or (b.end_date >= start and b.end_date <= end):
                return False
        return True
    
    def getPrice(self):
        return self.type.base_price

    def bookFor(self,user,start,end,Amenities):
        if(self.isAvailableFor(start,end)):
            
            return True
        else:
            raise Exception
        


    