from src.models.hotel.ModelHotel import ModelHotel
def get_hotels(location=None):
     return ModelHotel.query.all()