from flask import Blueprint, request
from src.services import userServices
from src.models.user.AbtractUser import AbstractUser
from src import app

# user = Blueprint("user", __name__, url_prefix='/user')

@app.route("/", methods=["GET"])
def hello():
    return "Hello"

@app.route("/user/<user_id>",methods=["GET"])
def get_user_details(user_id):
    user = AbstractUser.get_user_details(user_id)
    return user

@app.route("/user/register",methods=["POST"])
def user_registration():
    if request.method == "POST":
        data = request.json
        userServices.add_user(data)
    return 

@app.route("/<user_id>/delete", methods=["DELETE"])
def delete_user(user_id):
    AbstractUser.delete_user(user_id)


@app.route("/hotels/<start>/<end>/<location>", methods=["GET"])
def get_hotels(start, end, location):
    AbstractUser.get_hotels(start, end, location)

@app.route("/book/<room>/<start>/<end>",methods=["GET"])
def book_hotel(room, start, end):
    AbstractUser.book_hotel(room, start, end)

@app.route("/cancel/<booking_id>",methods=["GET"])
def cancel_booking(booking_id):
    AbstractUser.cancel_booking(booking_id)
