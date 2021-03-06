from crypt import methods
from flask import Blueprint, request,jsonify,abort
import jwt
from src.models.booking.ModelBooking import ModelBooking
from src.routes import bookingRoutes
from src.services import userServices
from src.models.user.AbstractUser import AbstractUser
from src import app
from flask_cors import CORS, cross_origin

user = Blueprint("user", __name__, url_prefix='/user')

@user.route("/<user_id>",methods=["GET"])
@cross_origin() 
def get_user_details(user_id):
    response = AbstractUser.get_user_details(user_id)
    return response

@user.route("/register",methods=["POST"])
@cross_origin()
def user_registration():
    if request.method == "POST":
        data = request.json
        res = userServices.add_user(data)
        user = AbstractUser.get_user_details(res.id)
        return user

@user.route("/login",methods=["POST"])
def login():
    user_data = request.get_json()
    data = userServices.login(user_data["email"],user_data["password"])
    if(data == None):
        return jsonify({"message": "You have enterted invalid email or password"}), 404
    else:
        type = str(data.type)
        token = jwt.encode({"username" : data.email,"type":str(type)},"CMPE202PROJ",algorithm="HS256")
        send_val = data.as_dict()
        send_val["type"] = type
        resp = {"response":{"user" : send_val},"token":token}
        print(resp)
        return resp

@user.route("/dummy",methods=["POST"])
def dummy():
    req =request.get_json()
    print(req["token"])
    x = userServices.validate_customer(req["token"])
    return str(x)

@user.route("/<user_id>/delete", methods=["DELETE"])
def delete_user(user_id):
    AbstractUser.delete_user(user_id)

@user.route("/hotels/<start>/<end>/<location>", methods=["GET"])
@cross_origin()
def get_hotels(start, end, location):
    hotels = AbstractUser.get_hotels(start, end, location)
    return hotels

@user.route("/book/<room>/<start>/<end>",methods=["GET"])
@cross_origin()
def book_hotel(room, start, end):
    AbstractUser.book_hotel(room, start, end)

@user.route("/booking/cancel",methods=["POST"])
@cross_origin()
def cancel_booking():
    if request.method == "POST":
        data = request.json
        AbstractUser.cancel_booking(data["booking_id"])
        return "Booking cancelled"

@user.route("/getBooking/<user_id>")
def get_by_user(user_id):
    return jsonify(list(map(lambda x: x.as_dict(),ModelBooking.query.filter_by(user_id=user_id).all())))
