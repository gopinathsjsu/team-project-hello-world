from typing import List
from src.db import db
import jwt


def login(username,password):
    from src.models.user.ModelUser import ModelUser
    return ModelUser.query.filter_by(email=username,password=password).first();

def validate_customer(token):
    try:
        print(token)
        data= jwt.decode(token,"CMPE202PROJ",algorithms="HS256")
        return data["type"]=="customer"
    except:
        return False

def validate_manager(token):
    from src.models.user.ModelUser import ModelUser
    try: 
        print(token)
        data= jwt.decode(token,"CMPE202PROJ",algorithms="HS256")
        if not data["type"]=="manager":
            return False
        return ModelUser.query.filter_by(email=data["username"]).first()
    except:
        return False


def add_user(user_data):
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
            layalty_points=user_data["layaltyPoints"],
            type = user_data["type"]
    )
    db.session.add(user)
    db.session.commit()
    return user

def delete_user(user_id):
    from src.models.user.ModelUser import ModelUser

    user = ModelUser.query.get_or_404(id=user_id)
    db.session.delete(user)
    db.session.commit()

def get_user_details(user_id):
    from src.models.user.ModelUser import ModelUser

    user = ModelUser.query.get_or_404(user_id)
    return user

def get_user_by_email_password(email, password):
    from src.models.user.ModelUser import ModelUser

    user = ModelUser.query.filter_by(email=email, password=password).first_or_404()
    return user