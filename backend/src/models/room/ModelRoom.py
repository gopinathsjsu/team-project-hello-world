from src.models.room.AbstractRoom import AbstractRoom
from src.db import db as database


from src.db import db
class ModelRoom(AbstractRoom):
    __tablename__ = "room"
    id = db.Column(db.Integer, primary_key=True)
    hotel_id = db.Column(db.Integer, db.ForeignKey('hotel.id'),
        nullable=False)

    bookings = database.relationship('ModelBooking', backref='room', lazy=True)
    
    def isAvailableFor(self,start,end):
        for b in self.bookings:
            if (b.start_date >= start and b.start_date <= end) or (b.end_date >= start and b.end_date <= end):
                return False
        return True

db.create_all()
