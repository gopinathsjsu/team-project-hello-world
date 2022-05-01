from src import db
from src.models.hotel.ModelHotel import ModelHotel
from src.models.room.TestRoom import TestRoom
database = db.get_instance()

def hotel_test():

    room = TestRoom()
    s = ModelHotel(room)
    database.create_all()


