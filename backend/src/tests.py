from datetime import date, datetime
from src import db
from src.models.hotel.TestHotel import TestHotel
from src.models.room.TestRoom import TestRoom

from src.models.room.TestRoom import TestRoom
database = db.get_instance()
database.create_all()

def hotel_test():

    room = TestRoom()
    s = TestHotel(1,room)
    s.rooms.append(TestRoom())
    s.rooms.append(TestRoom())
    s.rooms.append(TestRoom())
    s.rooms.append(TestRoom())
    #print(s)
    date = datetime.now()
    
    date2 = datetime.now()

    print(s.getAvailibilityOn(date,date2))
    

