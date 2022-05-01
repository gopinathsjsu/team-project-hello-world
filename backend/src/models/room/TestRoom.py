
from src.models.room.AbstractRoom import AbstractRoom


class TestRoom(AbstractRoom):
        def isAvailableFor(start,end):
            return True
        def  getPrice():
            pass
        def bookFor(start,end):
            pass