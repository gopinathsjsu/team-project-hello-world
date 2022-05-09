from src.models.booking.AbstractBooking import AbstractBooking
from src.models.user.AbtractUser import AbstractUser
from abc import ABC
from typing import List
from src.db import db

class ModelUser(db.Model):

    __tablename__ = "user"

    id = db.Column(db.Integer, unique=True, primary_key=True)
    first_name = db.Column(db.String(100), unique=False, nullable=False)
    last_name = db.Column(db.String(100), unique=False, nullable=True)
    phone_number = db.Column(db.Integer, unique=True, nullable=False)
    email = db.Column(db.String(70), unique=True, nullable=False)
    password = db.Column(db.String(100), unique=False, nullable=True)
    address = db.Column(db.String(100), unique=False, nullable=True)
    city = db.Column(db.String(20), unique=False, nullable=True)
    zip = db.Column(db.Integer, unique=False, nullable=True)
    state = db.Column(db.String(20), unique=False, nullable=True)
    country = db.Column(db.String(20), unique=False, nullable=True)
    layalty_points = db.Column(db.Integer, unique=False, nullable=True)
    bookings = db.Column(db.String(100), unique=False, nullable=True)

    def __init__(self,id,first_name,last_name,phone_number,email,password,address,city,zip,state,country) -> None:
        self.id = id
        self.first_name = first_name
        self.last_name = last_name
        self.phone_number = phone_number
        self.email = email
        self.password = password
        self.address = address
        self.city = city
        self.state = state
        self.country = country

    def getHotels(start, end, location):
        pass

    def bookHotel(room, start, end):
        pass

    def cancelBooking(booking_id):
        pass
