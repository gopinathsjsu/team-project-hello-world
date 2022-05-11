from crypt import methods
from flask import Blueprint
from flask import request,jsonify,abort
from src.models.booking.ModelBooking import ModelBooking
from src.models.user.ModelUser import ModelUser

booking = Blueprint("booking", __name__, url_prefix='/booking')

@booking.route("/",methods=["GET"])
def get():
    #TODO: change this to get user from JWT Tokens
    user = ModelUser.query.first()

    return jsonify(list(map(lambda x: x.as_dict(),ModelBooking.query.filter_by(user_id=user.id).all())))
    
@booking.route("/<room_id>",methods=["GET"])
def get_by_room(room_id):
    return jsonify(list(map(lambda x: x.as_dict(),ModelBooking.query.filter_by(room_id=room_id).all())))