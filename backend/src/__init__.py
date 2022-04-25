from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import dotenv_values

app = Flask(__name__)
app.app_context().push()
config = dotenv_values(".env")

class db:
    #print(config["CONN"])
    app.config["SQLALCHEMY_DATABASE_URI"]=config["CONN"]
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    datab = SQLAlchemy(app)

    def get_instance():
        return db.datab

db.get_instance().create_all()
from src.models.hotel.ModelHotel import ModelHotel
if __name__ == "__main__":
	print("Hello World")
