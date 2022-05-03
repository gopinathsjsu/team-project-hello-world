from abc import ABC
from src.models.user.AbtractUser import AbstractUser
from src.models.booking.AbstractBooking import AbstractBooking
from src.models.hotel.ModelHotel import ModelHotel
from typing import List
from src import db, app

# Dummy data to test
name = 'Pratyush'
email = 'pratyush@sjsu.com'
payment_info = "1234"
layalty_points = 0
bookings = []

class ModelUser(AbstractUser):
    
    def __init__(self, name, email, payment_info, ) -> None:
        super().__init__()
        self.name = name
        self.email = email
        self.payment_info = payment_info

    def getHotels(start, end, location):
        hotels = []
        hotels = ModelHotel.query.filter_by(ModelHotel.location.like(location))

        available_hotels = []
        # for hotel in hotels:
        #     is_available = hotel.getAvailibilityOn(start, end)
        #     if(is_available):
        #         available_hotels.append(hotel)
        return available_hotels

    def bookHotel(room, start, end):
        return

    def cancelBooking(booking_id):
        return
