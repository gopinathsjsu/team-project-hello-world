from requests import request
from flask import Blueprint
from flask import request,jsonify
from src.services import roomServices

room = Blueprint("room", __name__, url_prefix='/room')

@room.route("/<hotel_id>",methods=["GET","POST"])
def get_home(hotel_id):
    if request.method == "GET":
        return jsonify(list(map(lambda x: x.as_dict(),roomServices.get_rooms(hotel_id=hotel_id))))
    else:
        pass
