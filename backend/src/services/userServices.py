from typing import List
from src import db

def addUser(user_data):
    from src.models.user.ModelUser import ModelUser
    user = ModelUser(
            first_name=user_data['firstName'], 
            last_name=user_data['lastName'], 
            phone_number=user_data['phoneNumber'], 
            email=user_data['email'],
            password=user_data['password'], 
            address=user_data['address'], 
            city=user_data['city'], 
            zip=user_data['zip'], 
            state=user_data['state'], 
            country=user_data['country'],
            loyalty_points=0)
    db.session.add(user)
    db.session.commit()

def deleteUser(user_id):
    from src.models.user.ModelUser import ModelUser
    user = ModelUser.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()

def getHotels(start, end, location) -> List:
    from src.models.hotel.ModelHotel import ModelHotel
    hotels = ModelHotel.query.filter_by(ModelHotel.location.like(location))
    return hotels