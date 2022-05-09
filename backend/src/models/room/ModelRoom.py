from src.models.room.AbstractRoom import AbstractRoom
from src.db import db as database


from src.db import db
class ModelRoom(AbstractRoom):
    __tablename__ = "room"
    id = db.Column(db.Integer, primary_key=True)
    hotel_id = db.Column(db.Integer, db.ForeignKey('hotel.id'),
        nullable=False)
    type = db.Column(db.I)
    bookings = database.relationship('ModelBooking', backref='room', lazy=True)
    
    
    def getPrice():
        pass
db.create_all()
