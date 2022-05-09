from flask import Blueprint, request
from models.user.AbtractUser import AbstractUser
from src import app

user = Blueprint("user", __name__, url_prefix='/user')


@app.route("/user/registration",methods=["POST"])
def user_registration():
    if request.method == "POST":
        data = request.form
        AbstractUser.set_user(data)


@app.route("/<user_id>/delete", methods=["GET"])
def delete_user(user_id):
    AbstractUser.delete_user(user_id)


@app.route("/hotels/<start>/<end>/<location>", methods=["GET"])
def get_hotels(start, end, location):
    AbstractUser.get_hotels(start, end, location)

@app.route("/<room>/<start>/<end")
def book_hotel(room, start, end):
    AbstractUser.book_hotel(room, start, end)

@app.route("/<booking_id>")
def cancel_booking(booking_id):
    AbstractUser.cancel_booking(booking_id)
