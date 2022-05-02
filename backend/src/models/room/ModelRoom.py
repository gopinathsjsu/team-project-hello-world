from src.models.room.AbstractRoom import AbstractRoom


from src.db import db
class ModelRoom(AbstractRoom):
    __tablename__ = "room"
    id = db.Column(db.Integer, primary_key=True)
    hotel_id = db.Column(db.Integer, db.ForeignKey('hotel.id'),
        nullable=False)
db.create_all()
