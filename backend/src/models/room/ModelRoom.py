from src.models.room.AbstractRoom import AbstractRoom


from src.db import db
class ModelRoom(AbstractRoom):
    __tablename__ = "room"
    id = db.Column(db.Integer, primary_key=True)
db.create_all()
print("HELLO")