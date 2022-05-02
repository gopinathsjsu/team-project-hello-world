from requests import request
from flask import Blueprint
from flask import request
from src.services.hotelServices import *

hotel = Blueprint("hotel", __name__, url_prefix='/hotel')


@hotel.route("/",methods=["GET"])
def home_route():
    if request.method == "GET":
        print(get_hotels())

