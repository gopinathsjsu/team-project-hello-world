from abc import ABC, abstractmethod
from src.services import userServices

class AbstractUser(ABC):

    def get_user_details(user_id):
        user = userServices.get_user_details(user_id)
        user_dict = {
            'firstName': user.first_name,
            'lastName': user.last_name,
            'email': user.email,
            'phoneNumber': user.phone_number,
            'loyalty_points': user.loyalty_points
            }
        return user_dict

    def delete_user(id):
        userServices.deleteUser(id)

    def get_hotels(start, end, location):
        from src.models.hotel.AbstractHotel import AbstractHotel
        
        hotels = AbstractHotel.getAvailibilityOn(start, end, location)
        return hotels

    def book_hotel(room, start, end):
        from src.models.booking.AbstractBooking import AbstractBooking

        AbstractBooking.book(room, start, end)


    def cancel_booking(booking_id):
        from src.models.booking.AbstractBooking import AbstractBooking

        AbstractBooking.cancel(booking_id)
        