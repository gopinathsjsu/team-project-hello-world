from crypt import methods
from datetime import datetime
import imp
import json
from flask import Blueprint
from flask import request,jsonify,abort
from src.models.user.ModelUser import ModelUser
from src.routes.hotelRoutes import get_rooms
from src.models.room.ModelRoom import ModelRoom, RoomType
from src.models.hotel.ModelHotel import ModelHotel
from src.services import roomServices
from src.db import db
room = Blueprint("room", __name__, url_prefix='/room')
room_type = Blueprint("room_type", __name__, url_prefix='/roomType')
#TODO: Get All available rooms for hotels
@room.route("/<hotel_id>",methods=["GET","POST"])
def get_home(hotel_id):
    if request.method == "GET":
        return jsonify(list(map(lambda x: x.as_dict(),roomServices.get_rooms(hotel_id=hotel_id))))

    else:
            req =request.get_json()
            room = roomServices.add_room(hotel_id,room_type_id=req["type_id"],name=req["name"])
            
            return json.dumps(room.as_dict())


@room.route("/getAvailable/<room_id>",methods=["GET"])
def get_room_availibility(room_id):
    req =request.get_json()
    return str(roomServices.room_available(room_id=room_id,start=req["start"],end=req["end"]))


@room.route("/book/<room_id>",methods=["POST"])
def book_room(room_id):
        req = request.get_json()
        #TODO: change this to get user from JWT Tokens
        user = ModelUser.query.first()
        #try:
        if datetime.strptime(req["start"],"%Y/%m/%d") < datetime.now(): return "start date in the past"
        elif datetime.strptime(req["end"],"%Y/%m/%d") < datetime.now(): return "end date in the past"
        elif (datetime.strptime(req["end"],"%Y/%m/%d") - datetime.strptime(req["start"],"%Y/%m/%d")).days > 7: return "more than 7 days of booking not allowed" 
        elif (datetime.strptime(req["end"],"%Y/%m/%d") - datetime.strptime(req["start"],"%Y/%m/%d")).days < 1: return "Please book atleast 1 day"
        return roomServices.book_room(room_id,user.id,datetime.strptime(req["start"],"%Y/%m/%d"),datetime.strptime(req["end"],"%Y/%m/%d"),req["Amenities"])
        #except:
        #    return jsonify({"message": "Cannot book the room. Some error has occoured"}), 500



@room_type.route("/<hotel_id>",methods=["GET","POST"])
def get_room_types(hotel_id):
    if request.method == "GET":
        return jsonify(list(map(lambda x: x.as_dict(),roomServices.get_room_types(hotel_id))))
    elif request.method == "POST":
            req =request.get_json()
            roomtype = roomServices.add_room_type(hotel_id,req["name"],req["base_price"])
            return json.dumps(roomtype.as_dict())






