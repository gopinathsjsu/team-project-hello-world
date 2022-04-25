from models.hotel.AbstractHotel import AbstractHotel
from models.room.TestRoom import TestRoom
from room.AbstractRoom import AbstractRoom
from abc import ABC, abstractmethod
from typing import List


class TestHotel(AbstractHotel):
    rooms = []

    def __init__(self):
        room1 = TestRoom()
        self.rooms.append(room1)
        room2 = TestRoom()
        self.rooms.append(room2)
        room3 = TestRoom()
        self.rooms.append(room3)

    def getAvailibilityOn(start,end)-> List[AbstractRoom]:
        pass