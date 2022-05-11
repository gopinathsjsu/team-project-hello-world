from crypt import methods
from flask import Blueprint, request
import jwt
from src.services import userServices
from src.models.user.AbstractUser import AbstractUser
from src import app
from flask_cors import CORS, cross_origin

# user = Blueprint("user", __name__, url_prefix='/user')
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/", methods=["GET"])
def hello():
    return "Hello"

@app.route("/user/<user_id>",methods=["GET"])
@cross_origin() 
def get_user_details(user_id):
    response = AbstractUser.get_user_details(user_id)
    return response

@app.route("/user/register",methods=["POST"])
@cross_origin()
def user_registration():
    if request.method == "POST":
        data = request.json
        res = userServices.add_user(data)
        user = AbstractUser.get_user_details(res.id)
        return user

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

@app.route("/user/login", methods = ["POST"])
@cross_origin()
def user_login():
    data = request.json
    user = AbstractUser.get_user_by_email_password(data["email"], data["password"])
    return user

@app.route("/hotels/<start>/<end>/<location>", methods=["GET"])
@cross_origin()
def get_hotels(start, end, location):
    hotels = AbstractUser.get_hotels(start, end, location)
    return hotels

@app.route("/book/<room>/<start>/<end>",methods=["GET"])
@cross_origin()
def book_hotel(room, start, end):
    AbstractUser.book_hotel(room, start, end)

@app.route("/booking/cancel",methods=["POST"])
@cross_origin()
def cancel_booking():
    if request.method == "POST":
        data = request.json
        AbstractUser.cancel_booking(data["booking_id"])
        return "Booking cancelled"

