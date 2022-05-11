from src.models.user.ModelUser import ModelUser
from  src.db import db
from src.models.hotel.ModelHotel import ModelHotel
from src.models.room.ModelRoom import ModelRoom, RoomType


def add_room(hotel_id,room_type_id,name):
    hotel = ModelHotel.query.get(hotel_id)
    room_type = RoomType.query.get(room_type_id)

    room = ModelRoom(hotel_id=hotel.id,type_id=room_type.id)
    db.session.add(room)
    db.session.commit()
    return room


def add_room_type(hotel,typename,price):
    
    hotel = ModelHotel.query.get(hotel)
    roomtype = RoomType(name=typename,base_price=price,hotel_id=hotel.id)
    db.session.add(roomtype)
    db.session.commit()
    return roomtype


def get_rooms(hotel_id):
    return ModelRoom.query.filter_by(hotel_id=hotel_id).all()

def get_room_types(hotel_id):
    return RoomType.query.filter_by(hotel_id=hotel_id).all()

def room_available(room_id,start,end):
    room = ModelRoom.query.get(room_id)

    return room.isAvailableFor(start,end)

def book_room(room_id,user_id,start,end):
    
    user=ModelUser.query.get(user_id)
    room = ModelRoom.query.get(room_id)

    room.bookFor(user,start,end)