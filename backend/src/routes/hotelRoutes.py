from crypt import methods
from requests import request
from flask import Blueprint
from flask import request,jsonify
from src.services import userServices
from src.services.hotelServices import *
import json
hotel = Blueprint("hotel", __name__, url_prefix='/hotel')


@hotel.route("/",methods=["GET","POST"])
def home_route():
    if request.method == "GET":
        return jsonify(list(map(lambda x: x.as_dict(),get_hotels())))
    if request.method == "POST":
        req =request.get_json()
        if(userServices.validate_manager(req["token"]) != False):
            manager = userServices.validate_manager(req["token"])
            hotel = ModelHotel(name="Hotel1",location="San Jose",owner_id = manager.id)
            db.session.add(hotel)
            db.session.commit()
            return json.dumps(hotel.as_dict())
        else:
            return "400"
