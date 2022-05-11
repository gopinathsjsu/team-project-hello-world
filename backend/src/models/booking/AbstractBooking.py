
from abc import ABCMeta,ABC, abstractmethod
from typing import List
from src.db import db as database


class AbstractBooking(database.Model):
    __abstract__ = True