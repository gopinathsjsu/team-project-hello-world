from abc import ABC, abstractmethod

class AbstractUser(ABC):

    @abstractmethod
    def getHotels(start, end, location):
        pass
    
    @abstractmethod
    def bookHotel(room, start, end):
        pass

    @abstractmethod 
    def cancelBooking(booking_id):
        pass


    