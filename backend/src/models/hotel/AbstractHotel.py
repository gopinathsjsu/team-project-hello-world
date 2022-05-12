from src.models.booking.ModelBooking import ModelBooking
from src.models.room.AbstractRoom import AbstractRoom
from src.models.booking.AbstractBooking import AbstractBooking

from abc import ABCMeta,ABC, abstractmethod
from typing import List
from src.db import db as database
from datetime import date, datetime, timedelta


class Amenities:
    next_chain = None
    price = 0
    def __init__(self,price: float, next_chain=None) -> None:
        self.price = price
        self.next_chain = next_chain
        
    

    def get_price(self)-> float:
        return self.get_self_price() + self.get_next_price()

    def get_self_price(self)-> float:
        return self.price

    def get_next_price(self)-> float:
        if self.next_chain == None:
            return 0
        else:
            return self.next_chain.get_price()

    
 
class AbstractHotel(database.Model):
    __abstract__ = True
    def getAvailibilityOn(self,start: date,end:date) -> List[AbstractRoom]:
        available_rooms = []
        for r in self.rooms:
            if  r.isAvailableFor(start,end):
                available_rooms.append(r)
        return available_rooms
    def book(self,user, room: AbstractRoom,start,end,Amenities:Amenities):

        total_price = self.getPrice(room,start,end,Amenities)
        b = ModelBooking(start_date=start,end_date=end,room=room,user=user,price=total_price)
        room.bookings.append(b)
        database.session.add(b)
        database.session.commit()
        return b
        
    def getPrice(self,room: AbstractRoom,start: date,end:date,extra: Amenities) -> float:

        return room.getPrice() + self.getHolidayPricing(start,end) + extra.get_price()

    def getHolidayPricing(self,start: date,end:date):
        additional_cost = 0

        if(self.isWeekEndInInterval(start,end)):
            additional_cost += 10
        if(self.isHolidaySeason(start,end)):
            additional_cost += 10
        
        return additional_cost

    def isWeekEndInInterval(sellf,start:date,end:date):
        date = start

        while(date != end):
            if(date.weekday() > 4):
                return True
            date += timedelta(days=1)
        return False

    def isHolidaySeason(self,start:date,end:date):
        return True


    def getAmenitiesPricing(Amenities):
        return 0

        