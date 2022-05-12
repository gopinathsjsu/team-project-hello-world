from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import dotenv_values
from src.routes.bookingRoutes import booking
from src.routes.hotelRoutes import hotel
from src.routes.userRoutes import user
from src.routes.roomRoutes import room,room_type
from flask_cors import CORS

app = Flask(__name__)

CORS(app, origins="*",resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

app.app_context().push()
config = dotenv_values(".env")
app.config["SQLALCHEMY_DATABASE_URI"]=config["CONN"]
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

from src.db import db
db.init_app(app)

app.register_blueprint(hotel)
app.register_blueprint(room)
app.register_blueprint(room_type)
app.register_blueprint(booking)
app.register_blueprint(user)

from src.models.hotel.ModelHotel import ModelHotel
from src.models.room.ModelRoom import ModelRoom
from src.models.user.ModelUser import ModelUser
from src.routes import userRoutes

import src.tests

#src.tests.room_test()


if __name__ == "__main__":
	print("Hello World")
