from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import dotenv_values

app = Flask(__name__)
app.app_context().push()
config = dotenv_values(".env")
app.config["SQLALCHEMY_DATABASE_URI"]=config["CONN"]
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
class db:
    #print(config["CONN"])
    datab = SQLAlchemy(app)

    def get_instance():
        return db.datab
from src.models.hotel.ModelHotel import ModelHotel

db.get_instance().create_all()
if __name__ == "__main__":
	print("Hello World")
