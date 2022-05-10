from crypt import methods
from flask import Blueprint, request
import jwt
from src.services import userServices
from src.models.user.AbtractUser import AbstractUser
from src import app

# user = Blueprint("user", __name__, url_prefix='/user')

@app.route("/", methods=["GET"])
def hello():
    return "Hello"


@app.route("/user/register",methods=["POST"])
def user_registration():
    if request.method == "POST":
        data = request.json
        userServices.add_user(data)
    return ""

@app.route("/user/login",methods=["POST"])
def login():
    user_data = request.get_json()
    data = userServices.login(user_data["username"],user_data["password"])
    if(data == None):
        return "404"
    else:
        print(str(data.type))
        token = jwt.encode({"username" : data.email,"type":str(data.type)},"CMPE202PROJ",algorithm="HS256")
        resp = {"response":{"username" : data.email},"token":token}
        return resp

@app.route("/user/dummy",methods=["POST"])
def dummy():
    req =request.get_json()
    print(req["token"])
    x = userServices.validate_customer(req["token"])
    return str(x)

@app.route("/<user_id>/delete", methods=["DELETE"])
def delete_user(user_id):
    AbstractUser.delete_user(user_id)


@app.route("/hotels/<start>/<end>/<location>", methods=["GET"])
def get_hotels(start, end, location):
    AbstractUser.get_hotels(start, end, location)

@app.route("/<room>/<start>/<end>")
def book_hotel(room, start, end):
    AbstractUser.book_hotel(room, start, end)

@app.route("/<booking_id>")
def cancel_booking(booking_id):
    AbstractUser.cancel_booking(booking_id)
