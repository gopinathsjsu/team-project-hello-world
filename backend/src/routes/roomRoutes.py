from crypt import methods
from datetime import datetime
import imp
import json
import re
from flask import Blueprint
from flask import request,jsonify,abort
from src.models.user.ModelUser import ModelUser
from src.routes.hotelRoutes import get_rooms
from src.models.room.ModelRoom import ModelRoom, RoomType
from src.models.hotel.ModelHotel import ModelHotel
from src.services import roomServices
from src.db import db
from dateutil import parser

room = Blueprint("room", __name__, url_prefix='/room')
room_type = Blueprint("room_type", __name__, url_prefix='/roomType')

DATE_FORMAT =  "%Y-%m-%dT%H:%M:%S"
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
        try:
            if parser.parse(req["start"]) < datetime.now(): return "start date in the past"
            elif parser.parse(req["end"]) < datetime.now(): return "end date in the past"
            elif (parser.parse(req["end"]) - parser.parse(req["start"])).days > 7: return "more than 7 days of booking not allowed" 
            elif (parser.parse(req["end"]) - parser.parse(req["start"])).days < 1: return "Please book atleast 1 day"
            return roomServices.book_room(room_id,user.id,parser.parse(req["start"]),parser.parse(req["end"]),req["Amenities"])
        except:
           return jsonify({"message": "Cannot book the room. Some error has occoured"}), 500



@room_type.route("/<hotel_id>",methods=["GET","POST"])
def get_room_types(hotel_id):
    request.args.get("start", default=None, type=str)
    request.args.get("end", default=None, type=str)

    def helper(roomType):
        ans = {}
        count = 0
        for r in roomType.rooms:
            if r.isAvailableFor(parser.parse(request.args["start"]).replace(tzinfo=None),parser.parse(request.args["end"]).replace(tzinfo=None)):
                count+=1
        if(count > 0):
            ans = {"name":roomType.name,"id":roomType.id,"count":count, "price":roomType.base_price}
        return ans
        
    if request.method == "GET":
        return jsonify(list(map(helper,roomServices.get_room_types(hotel_id))))
    elif request.method == "POST":
            req =request.get_json()
            roomtype = roomServices.add_room_type(hotel_id,req["name"],req["base_price"])
            return json.dumps(roomtype.as_dict())

@room_type.route("book",methods=["POST"])
def book_room_type():
    req = request.get_json()
    if parser.parse(req["start"]).replace(tzinfo=None) < datetime.now(): return "start date in the past"
    elif parser.parse(req["end"]).replace(tzinfo=None) < datetime.now(): return "end date in the past"
    elif (parser.parse(req["end"]).replace(tzinfo=None) - parser.parse(req["start"]).replace(tzinfo=None)).days > 7: return "more than 7 days of booking not allowed" 
    elif (parser.parse(req["end"]).replace(tzinfo=None) - parser.parse(req["start"]).replace(tzinfo=None)).days < 1: return "Please book atleast 1 day"
    return roomServices.book_by_room_type(req["room_type"],req["no_of_rooms"],req["start"],req["end"],req["amenities"])




