from abc import ABC, abstractmethod
from src.models.booking.AbstractBooking import AbstractBooking
from src.services import userServices
from src import app, db

class AbstractUser(ABC):
    def deleteUser(id):
        userServices.deleteUser(id)


    def getHotels(start, end, location):
        hotels = []
        hotels = userServices.getHotels(start, end, location)

        available_hotels = []
        for hotel in hotels:
            is_available = hotel.getAvailibilityOn(start, end)
            if(is_available):
                available_hotels.append(hotel)
        return available_hotels
    

    def bookHotel(room, start, end):
        AbstractBooking.book(room, start, end)


    def cancelBooking(booking_id):
        AbstractBooking.cancel(booking_id)
        