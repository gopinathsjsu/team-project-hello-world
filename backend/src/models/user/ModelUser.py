
import enum
from src.models.booking.AbstractBooking import AbstractBooking
from src.models.user.AbstractUser import AbstractUser
from abc import ABC
from typing import List
from src.db import db


class UserType(enum.Enum):
    customer = "customer"
    manager  = "manager"

    def __str__(self):
        return self.value

    
class ModelUser(db.Model):

    __tablename__ = "user"

    id = db.Column(db.Integer, unique=True, primary_key=True)
    first_name = db.Column(db.String(100), unique=False, nullable=False)
    last_name = db.Column(db.String(100), unique=False, nullable=True)
    phone_number = db.Column(db.String(12), unique=True, nullable=False)
    email = db.Column(db.String(70), unique=True, nullable=False)
    password = db.Column(db.String(100), unique=False, nullable=True)
    address = db.Column(db.String(100), unique=False, nullable=True)
    city = db.Column(db.String(20), unique=False, nullable=True)
    zip = db.Column(db.Integer, unique=False, nullable=True)
    state = db.Column(db.String(20), unique=False, nullable=True)
    country = db.Column(db.String(20), unique=False, nullable=True)
    layalty_points = db.Column(db.Integer, unique=False, nullable=True)
    type = db.Column(db.Enum(UserType),nullable=False)
    bookings = db.relationship('ModelBooking', backref='user', lazy=True)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}



