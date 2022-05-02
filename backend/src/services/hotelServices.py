from src.models.hotel.ModelHotel import ModelHotel
def get_hotels():
     return ModelHotel.query.all()