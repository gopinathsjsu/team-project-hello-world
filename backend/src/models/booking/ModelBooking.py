from  src.models.booking.AbstractBooking import AbstractBooking
from src.db import db as database


class ModelBooking(AbstractBooking):
    id = database.Column(database.Integer, primary_key=True)
    start_date =  database.Column(database.DateTime)
    end_date =  database.Column(database.DateTime)
    price = database.Column(database.Float)
    room_id = database.Column(database.Integer, database.ForeignKey('room.id'),nullable=False)
    user_id = database.Column(database.Integer, database.ForeignKey('user.id'),)
    amenities= database.Column(database.JSON)
    status = database.Column(database.String(32))
    def __init__(self,**kwargs) -> None:
        super().__init__(**kwargs)
    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}


