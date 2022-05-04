from abc import ABC
from enum import unique
from src.models.user.AbtractUser import AbstractUser
from src.models.booking.AbstractBooking import AbstractBooking
# from src.models.hotel.ModelHotel import ModelHotel
from typing import List
from src.db import db

# Dummy data to test
# name = 'Pratyush'
# email = 'pratyush@sjsu.com'
# payment_info = "1234"
# layalty_points = 0
# bookings = []

class ModelUser(db.Model):

    __tablename__ = "User"

    id = db.Column(db.Integer, unique=True, primary_key=True)
    email = db.Column(db.String(70), unique=True, nullable=False)
    payment_info = db.Column(db.String(16), unique=True, nullable=True)
    layalty_points = db.Column(db.Integer, unique=False, nullable=True)
    bookings = db.Column(db.String(100), unique=False, nullable=True)
    
    def __init__(self, name, email, payment_info) -> None:
        super().__init__()
        self.name = name
        self.email = email
        self.payment_info = payment_info

    def dummy():
        dummy_data = ModelUser('Pratyush', 'pratyush@sharma.com', '123456')
        db.session.add(dummy_data)
        db.session.commit()

    def getHotels(start, end, location):
        # hotels = []
        # hotels = ModelHotel.query.filter_by(ModelHotel.location.like(location))

        # available_hotels = []
        # for hotel in hotels:
        #     is_available = hotel.getAvailibilityOn(start, end)
        #     if(is_available):
        #         available_hotels.append(hotel)
        # return available_hotels
        return

    def bookHotel(room, start, end):
        return

    def cancelBooking(booking_id):
        return
