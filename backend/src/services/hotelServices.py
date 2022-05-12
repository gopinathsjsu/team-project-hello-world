from datetime import datetime
from src.models.hotel.ModelHotel import ModelHotel
from src.db import db
from sqlalchemy.orm import joinedload

def get_hotels(**kwargs):


     print("location" in kwargs)
     if "location" in kwargs.keys():
          hotels = ModelHotel.query.filter_by(kwargs["location"]).all()
     else:
          hotels = ModelHotel.query.filter_by().all()
     print(hotels)
     return list(filter(
          lambda h : h.isAvailableFor(datetime.strptime(kwargs["start"],"%Y/%m/%d"),datetime.strptime(kwargs["start"],"%Y/%m/%d")) 
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