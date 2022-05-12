from crypt import methods
from datetime import datetime
from flask import Blueprint
from flask import request,jsonify
from src.models.hotel.ModelHotel import ModelHotel
from src.services import hotelServices
from src.services import userServices
import json
from src.db import db
from src.services import hotelServices
from flask_cors import cross_origin

hotel = Blueprint("hotel", __name__, url_prefix='/hotel')

@hotel.route("/",methods=["GET","POST"])
@cross_origin()
def home_route():
    request.args.get("location", default=None, type=str)
    request.args.get("start", default=None, type=str)
    request.args.get("end", default=None, type=str)

    if request.method == "GET":
        print(request.headers["Authorization"])
        args= request.args.to_dict()
        return jsonify(list(map(lambda x: x.as_dict(), hotelServices.get_hotels(**args))))
    if request.method == "POST":
        req =request.get_json()
        if(userServices.validate_manager(req["token"]) != False):
            manager = userServices.validate_manager(req["token"])
            hotel = ModelHotel(name="Hotel1",location="San Jose",owner_id = manager.id)
            db.session.add(hotel)
            db.session.commit()
            return json.dumps(hotel.as_dict())
        else:
            return "400"

@hotel.route("/<hotel_id>/rooms",methods=["GET"])
def get_rooms(hotel_id):
    print(hotelServices.get_rooms(hotel_id))

@hotel.route("/<hotel_id>",methods=["PUT","GET"])
def change_information(hotel_id):

    if request.method == "PUT":
    
        req = request.get_json()
        
        information = ModelHotel.query.filter_by(id=req['id']).first()
        
        information.name = req['name'] if 'name' in req else information.name
        information.location = req['location'] if 'location' in req else information.location
        information.owner_id = req['owner_id'] if 'owner_id' in req else information.owner_id

        db.session.commit()

        return "Done"
    
    elif request.method == "GET":


        information = ModelHotel.query.filter_by(id=hotel_id).first()

        output = {'name': information.name, 'location': information.location, 'owner_id': information.owner_id}

        return output