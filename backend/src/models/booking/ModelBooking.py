from  src.models.booking.AbstractBooking import AbstractBooking
from src.db import db as database


class ModelBooking(AbstractBooking):
    id = database.Column(database.Integer, primary_key=True)
    start_date =  database.Column(database.DateTime)
    end_date =  database.Column(database.DateTime)
    room_id = database.Column(database.Integer, database.ForeignKey('room.id'),nullable=False)
    user_id = database.Column(database.Integer, database.ForeignKey('user.id'),nullable=False)

    def __init__(self,**kwargs) -> None:
        super().__init__(**kwargs)

