from datetime import date, datetime, timedelta
from src.db import db as database
from src.models.hotel.AbstractHotel import Amenities
from src.models.hotel.TestHotel import TestHotel
from src.models.room.TestRoom import TestRoom

from src.models.room.TestRoom import TestRoom
database.create_all()

def hotel_test():
    print("Running tests for hotel")
    room = TestRoom()
    s = TestHotel(1,room)
    s.rooms.append(TestRoom())
    s.rooms.append(TestRoom())
    s.rooms.append(TestRoom())
    s.rooms.append(TestRoom())
    #print(s)
    date = datetime.now()
    
    date2 = datetime.now() + timedelta(days=2)


    breakfast = Amenities(20,Amenities(30))
    
    
    print(s.getAvailibilityOn(date,date2))
    print(s.getPrice(room,date,date2,extra=breakfast))
    

