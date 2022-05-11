from crypt import methods
import imp
import json
from requests import request
from flask import Blueprint
from flask import request,jsonify
from src.routes.hotelRoutes import get_rooms
from src.models.room.ModelRoom import ModelRoom, RoomType
from src.models.hotel.ModelHotel import ModelHotel
from src.services import roomServices
from src.db import db
room = Blueprint("room", __name__, url_prefix='/room')
room_type = Blueprint("room_type", __name__, url_prefix='/roomType')

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

@room_type.route("/<hotel_id>",methods=["GET","POST"])
def get_room_types(hotel_id):
    if request.method == "GET":
        return jsonify(list(map(lambda x: x.as_dict(),roomServices.get_room_types(hotel_id))))
    elif request.method == "POST":
            req =request.get_json()
            roomtype = roomServices.add_room_type(hotel_id,req["name"],req["base_price"])
            return json.dumps(roomtype.as_dict())




