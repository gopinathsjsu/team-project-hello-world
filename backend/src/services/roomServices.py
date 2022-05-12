from datetime import datetime
from src.models.booking.Amenity import Amenity
from src.models.hotel.AbstractHotel import Amenities
from src.models.user.ModelUser import ModelUser
from  src.db import db
from src.models.hotel.ModelHotel import ModelHotel
from src.models.room.ModelRoom import ModelRoom, RoomType
from flask import jsonify
DATE_FORMAT =  "%Y-%m-%dT%H:%M:%S"
from dateutil import parser



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

    return room.isAvailableFor(parser.parse(start),datetime.parser.parse(end))

def book_room(room_id,user_id,start,end,amenity_arr):
    
    user=ModelUser.query.get(user_id)
    room = ModelRoom.query.get(room_id)
    print(room.hotel)
    
    prev = None
    for a in amenity_arr:
        amenity = Amenity.query.filter_by(hotel_id=room.hotel.id,name = a).first()
        if(amenity != None):
            prev = Amenities(amenity.price,prev)
    
    booking = user.book_hotel(room,start,end,prev,room.hotel)
    booking.amenities = amenity_arr
    db.session.add(booking)
    db.session.commit()
    return booking.as_dict()

def book_by_room_type(type_id,no_of_bookings,start,end,amenity_list):
    #TODO: change this to get user from JWT Tokens
    user = ModelUser.query.first()
    rooms = RoomType.query.get(type_id).rooms
    
    prev = None
    for a in amenity_list:
        amenity = Amenity.query.filter_by(hotel_id=rooms[0].hotel.id,name = a).first()
        if(amenity != None):
            prev = Amenities(amenity.price,prev)

    for room in rooms:

        if room.isAvailableFor(parser.parse(start),parser.parse(end)):
            user.book_hotel(room, parser.parse(start),parser.parse(end),prev,room.hotel)

    return "True"

