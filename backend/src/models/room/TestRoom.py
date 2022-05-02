
from src.models.room.AbstractRoom import AbstractRoom


class TestRoom(AbstractRoom):
        __abstract__ = True
        def isAvailableFor(self,start,end):
            return True
        def  getPrice(self):
            return 0
        def bookFor(start,end):
            pass