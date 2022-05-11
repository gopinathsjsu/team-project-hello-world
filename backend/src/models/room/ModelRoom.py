from src.models.room.AbstractRoom import AbstractRoom
from src.db import db as database


from src.db import db
class ModelRoom(AbstractRoom):
    __tablename__ = "room"
    id = db.Column(db.Integer, primary_key=True)
    hotel_id = db.Column(db.Integer, db.ForeignKey('hotel.id'),
        nullable=False)
    type_id = db.Column(db.Integer,db.ForeignKey('room_type.id'))
    type = database.relationship('RoomType')

    bookings = database.relationship('ModelBooking', backref='room', lazy=True)

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class RoomType(db.Model):
    __tablename__ = "room_type"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32),nullable=False)
    base_price = db.Column(db.Float,nullable=False)
    hotel_id = db.Column(db.Integer, db.ForeignKey('hotel.id'),
        nullable=False)

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}



