from src.models.hotel.AbstractHotel import AbstractHotel
from src.models.room.TestRoom import TestRoom
from src.models.room.AbstractRoom import AbstractRoom
from abc import ABC, abstractmethod
from typing import List
from datetime import date


class TestHotel(AbstractHotel):
    __abstract__ = True
    rooms = []

    def __init__(self,id,room) -> None:
        self.id = id
        self.rooms.append(room)