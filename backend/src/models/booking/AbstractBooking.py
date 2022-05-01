
from abc import ABCMeta,ABC, abstractmethod
from typing import List
from src import db
from src.models.user.AbtractUser import AbstractUser
from src.models.room.AbstractRoom import AbstractRoom

database = db.get_instance()

class AbstractBooking(database.Model):
    __abstract__ = True

    def setCustomer(self,user:AbstractUser):
        self.user = user

    def setRoom(self,room:AbstractRoom):
        self.room = room

    def setInterval(self,start,end):
        pass