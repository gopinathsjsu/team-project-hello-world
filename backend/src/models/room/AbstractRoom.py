from abc import ABC, abstractmethod
from src.db import db


class AbstractRoom(db.Model):
    __abstract__ = True
    @abstractmethod
    def isAvailableFor(start,end):
        pass
    
    @abstractmethod
    def  getPrice(self):
        pass

    @abstractmethod 
    def bookFor(start,end):
        pass


    