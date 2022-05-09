from flask import Blueprint, request
from models.user.AbtractUser import AbstractUser
from src import app

user = Blueprint("user", __name__, url_prefix='/user')


@app.route("/user/registration",methods=["POST"])
def user_registration():
    if request.method == "POST":
        data = request.form
        AbstractUser.setUser(data)
