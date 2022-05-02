from abc import ABC, abstractmethod


class AbstractRoom(ABC):

    @abstractmethod
    def isAvailableFor(start,end):
        pass
    
    @abstractmethod
    def  getPrice(self):
        pass

    @abstractmethod 
    def bookFor(start,end):
        pass


    