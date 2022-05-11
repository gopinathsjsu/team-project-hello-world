from src.models.hotel.ModelHotel import ModelHotel
from src.db import db
from sqlalchemy.orm import joinedload

def get_hotels(location=None):
     return ModelHotel.query.all()

def create_hotels(hotel):
     db.session.add(hotel)
     db.session.commit()


def get_rooms(hotel_id):

     hotel = ModelHotel.query.get(hotel_id)
     print(hotel.rooms)
     return hotel.rooms