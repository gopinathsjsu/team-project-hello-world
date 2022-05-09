from cgi import test
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import dotenv_values
from src.routes.hotelRoutes import hotel
from src.models.user.ModelUser import ModelUser

app = Flask(__name__)

app.app_context().push()
config = dotenv_values(".env")
app.config["SQLALCHEMY_DATABASE_URI"]=config["CONN"]
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

from src.db import db
db.init_app(app)

app.register_blueprint(hotel)

from src.models.hotel.ModelHotel import ModelHotel
from src.models.room.ModelRoom import ModelRoom

# Pratyush Test
# ModelUser.dummy()
 

db.create_all()
import src.tests

src.tests.room_test()


if __name__ == "__main__":
	print("Hello World")
