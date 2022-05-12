from crypt import methods
from flask import Blueprint
from flask import request,jsonify,abort
from src.models.booking.ModelBooking import ModelBooking
from src.models.user.ModelUser import ModelUser
from src.db import db

booking = Blueprint("booking", __name__, url_prefix='/booking')
@booking.route("/",methods=["GET", "DELETE"])
def get():
    #TODO: change this to get user from JWT Tokens
    if request.method == "GET":
        user = ModelUser.query.first()
        
        def helper(booking):
            ret_val = booking.as_dict()
            ret_val["username"] = user.first_name + " " + user.last_name
            ret_val["hotelname"] = booking.room.hotel.name
            ret_val["status"] = "booked"
            ret_val["type"] = booking.room.type.name
            return ret_val
        return jsonify(list(map(helper,ModelBooking.query.filter_by(user_id=user.id).all())))
    
    elif request.method == "DELETE":
        req = request.args.to_dict()

        data = ModelBooking.query.filter_by(id = req['booking_id']).first()
        data.status = 'cancelled'
        db.session.commit()
        return "done"


@booking.route("/<room_id>",methods=["GET"])
def get_by_room(room_id):
    return jsonify(list(map(lambda x: x.as_dict(),ModelBooking.query.filter_by(room_id=room_id).all())))

