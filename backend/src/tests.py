from datetime import date, datetime, timedelta
from src.models.user.ModelUser import ModelUser
from src.models.booking.ModelBooking import ModelBooking
from src.models.hotel.ModelHotel import ModelHotel
from src.models.room.ModelRoom import ModelRoom, RoomType
from src.db import db as database
from src.models.hotel.AbstractHotel import Amenities
from src.models.hotel.TestHotel import TestHotel
from src.models.room.TestRoom import TestRoom
from src.models.room.TestRoom import TestRoom
print("HELLLL0")

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
    

def room_test():
    
    Hotel = ModelHotel()

    roomtype = RoomType(name="Small",base_price=50,hotel=Hotel)
    room1 = ModelRoom(type=roomtype)

    Hotel.rooms.append(room1)
    date1 = datetime.now()

    date2 = datetime.now() + timedelta(days=2)
    user  = ModelUser(first_name="Jayam",last_name="Thaker",phone_number="01234567",email="jayam@abc.com",password="a123",address="vfv",city="San Jose",zip="95126",state="CA");
    b1 = ModelBooking(start_date=date1,end_date=date2,room=room1,user=user)

    print(room1.isAvailableFor(date1+ timedelta(days=1),date1+ timedelta(days=3)))
    print(room1.isAvailableFor(date1+ timedelta(days=-1),date1+ timedelta(days=1)))
    print(room1.isAvailableFor(date1+ timedelta(days=3),date1+ timedelta(days=4)))
    print(room1.getPrice())
    room1.bookFor(user,date1+ timedelta(days=3),date1+ timedelta(days=4))
    print(room1.bookings)
    # database.session.add(user)
    # database.session.add(room1)
    # database.session.add(Hotel)
    # database.session.add(b1)
    # database.session.commit()


