from  src.db import db
from src.models.hotel.ModelHotel import ModelHotel
from src.models.room.ModelRoom import ModelRoom, RoomType


def add_room(hotel_id,room_type_id,name):
    hotel = ModelHotel.query.get(hotel_id)
    room_type = RoomType.query.get(room_type_id)

    room = ModelRoom(type=room_type)
    db.session.add(room)
    db.session.commit()


def add_room_type(hotel,typename,price):
    roomtype = RoomType(name=typename,price=price,hotel=hotel)
    db.session.add(roomtype)
    db.session.commit()


def get_rooms(hotel_id):
    ModelRoom.query.filter(hotel_id=hotel_id)