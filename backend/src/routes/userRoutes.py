from flask import Blueprint, request
from src.services import userServices
from src.models.user.AbtractUser import AbstractUser
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

@app.route("/<user_id>/delete", methods=["DELETE"])
def delete_user(user_id):
    AbstractUser.delete_user(user_id)


@app.route("/hotels/<start>/<end>/<location>", methods=["GET"])
def get_hotels(start, end, location):
    hotels = AbstractUser.get_hotels(start, end, location)
    return hotels

@app.route("/book/<room>/<start>/<end>",methods=["GET"])
def book_hotel(room, start, end):
    AbstractUser.book_hotel(room, start, end)

@app.route("/cancel/<booking_id>",methods=["GET"])
def cancel_booking(booking_id):
    AbstractUser.cancel_booking(booking_id)
