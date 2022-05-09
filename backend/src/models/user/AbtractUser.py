from abc import ABC, abstractmethod
from src.services import userServices
from src import app, db

class AbstractUser(ABC):
    def delete_user(id):
        userServices.deleteUser(id)


    def get_hotels(start, end, location):
        hotels = []
        hotels = userServices.getHotels(start, end, location)

        available_hotels = []
        for hotel in hotels:
            is_available = hotel.getAvailibilityOn(start, end)
            if(is_available):
                available_hotels.append(hotel)
        return available_hotels
    

    def book_hotel(room, start, end):
        from src.models.booking.AbstractBooking import AbstractBooking

        AbstractBooking.book(room, start, end)


    def cancel_booking(booking_id):
        from src.models.booking.AbstractBooking import AbstractBooking
        
        AbstractBooking.cancel(booking_id)
        