from abc import ABC, abstractmethod


class AbstractRoom(ABC):

    @abstractmethod
    def isAvailableFor(start,end):
        pass
    
    @abstractmethod
    def  getPrice():
        pass

    @abstractmethod 
    def bookFor(start,end):
        pass


    