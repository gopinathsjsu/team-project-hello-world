from src.models.hotel.ModelHotel import ModelHotel
from src.db import db
def get_hotels(location=None):
     return ModelHotel.query.all()

def create_hotels(hotel):
     db.session.add(hotel)
     db.session.commit()