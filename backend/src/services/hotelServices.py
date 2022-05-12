from datetime import datetime
from src.models.hotel.ModelHotel import ModelHotel
from src.db import db
from sqlalchemy.orm import joinedload
DATE_FORMAT =  "%Y-%m-%dT%H:%M:%S"
from dateutil import parser

def get_hotels(**kwargs):


     print("location" in kwargs)
     if "location" in kwargs.keys():
          hotels = ModelHotel.query.filter_by(location=kwargs["location"]).all()
     else:
          hotels = ModelHotel.query.filter_by().all()
     print(hotels)
     print(type(parser.parse(kwargs["start"])))
     return list(filter(
          lambda h : h.isAvailableFor(start=parser.parse(kwargs["start"]),end=parser.parse(kwargs["end"])) 
          if ("start" in kwargs.keys()) and ("end" in kwargs.keys())
          else True
          ,hotels))

def create_hotels(hotel):
     db.session.add(hotel)
     db.session.commit()


def get_rooms(hotel_id):

     hotel = ModelHotel.query.get(hotel_id)
     print(hotel.rooms)
     return hotel.rooms