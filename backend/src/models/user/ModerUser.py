from abc import ABC
from src.models.user.AbtractUser import AbstractUser
from typing import List
from src import db, app

database = db.get_instance()

@app.route('/')
def hello_world():
        return "This is User class"

class ModelUser(database.Model):
    id = database.Column(database.Integer, primary_key=True)
    def getHotels(start, end, location):
        return

    def bookHotel(room, start, end):
        return

    def cancelBooking(booking_id):
        return
