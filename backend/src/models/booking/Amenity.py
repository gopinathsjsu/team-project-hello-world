
from src.db import db

class Amenity(db.Model):
    __tablename__ = "amenities"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String,nullable=False)
    price = db.Column(db.Integer)
    hotel_id = db.Column(db.Integer, db.ForeignKey('hotel.id'),nullable=False)
