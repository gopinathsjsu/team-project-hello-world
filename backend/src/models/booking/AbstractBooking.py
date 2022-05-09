
from abc import ABCMeta,ABC, abstractmethod
from typing import List
from src.db import db as database
from src.models.user.AbtractUser import AbstractUser


class AbstractBooking(database.Model):
    __abstract__ = True

    def setCustomer(self,user:AbstractUser):
        self.user = user

    def setInterval(self,start,end):
        pass