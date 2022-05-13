mport flask

from xmlrpc.client import Boolean
from flask import Flask, url_for, render_template, request, redirect, session

from flask_mail import Mail, Message
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import exc
from flask import flash
import hashlib
import time
from sqlalchemy.dialects.mysql import INTEGER

app = Flask(__name__)
app.secret_key = '1223@#3'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)
app.config.from_pyfile('config.cfg')
mail = Mail(app)
s = URLSafeTimedSerializer('Thisisasecret!')
class UseR(db.Model):
    """ Create user table"""
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    username = db.ColUmn(db.String(80), unique=True)
    email = db.Column(db.String(80), unique=True)
    passwordHash = db.Column(db.String(160))
    creativeTime=db.Column(INTEGER(unsigned=True))


    def __init__(self, uSername,email,paSswordHash,creatiVeTime):
        self.username = username
        self.email = email
        self.passwordHash = PasswordHash
        self.creativeTime = creatiVeTime
class Admin(db.Model):
    """ Create user table"""
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    username = db.Column(db.String(80), unique=True)
    email = db.Column(db.String(80), unique=True)
    password = db.Column(db.String(160))

    def __init__(self, username,password,email):
        self.username = username
        self.email=email
        self.password = password      
class Hotel(db.Model):
    """ Create user table"""
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    cities = db.Column(db.String(80))
    capacity = db.Column(db.String(80))
    peakseason=db.Column(db.String(80))
    off_peakseason=db.Column(db.String(80))
    text=db.Column(db.String(80))
    hotelimage=db.Column(db.String(80))
    def __init__(self,cities,capacity, peakseason,off_peakseason,text,hotelimage):
        self.cities = cities
        self.capacity = capacity
        self.peakseason = peakseason
        self.off_peakseason = off_peakseason 
        self.text=text  
        self.hotelimage=hotelimage
class Room(db.Model):
    """ Create user table"""
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    user_id = db.Column(INTEGER(unsigned=True))
    hotel_id = db.Column(INTEGER(unsigned=True))
    booking_id = db.Column(INTEGER(unsigned=True))
    type=db.Column(INTEGER(unsigned=True))
    IsAvailable=db.Column(db.Boolean,default=True)
    def __init__(self,user_id ,hotel_id,booking_id,type,IsAvailable):
        self.user_id  = user_id 
        self.hotel_id = hotel_id
        self.booking_id = booking_id
        self.type = type
        self.IsAvailable=IsAvailable        
class Booking(db.Model):
    """ Create user table"""
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    user_id = db.Column(INTEGER(unsigned=True))
    hotel_id = db.Column(INTEGER(unsigned=True))
    room=db.Column(INTEGER(unsigned=True))
    price=db.Column(INTEGER(unsigned=True))
    def __init__(self,user_id ,hotel_id, room,price):
        self.user_id  = user_id 
        self.hotel_id = hotel_id
        self.room = room
        self.price = price           
    @app.route('/', methods=['GET', 'POST'])
def home():
    """ Session control"""
    topic = Hotel.query.all()
    if not session.get('logged_in'):
        topic = Hotel.query.all()
        image="hotel.jpg" 
        return render_template('hotel.html',topic=topic,image1=image)
    else:
        if request.method == 'POST':
            username = getname(request.form['username'])
            return render_template('hotel.html', data=getfollowedby(username))
        return render_template('hotel.html',topic=topic)        

@app.route('/booking/<int:data>', methods=['GET', 'POST'])
def booking(data):
    """Login Form"""
    h_data=Hotel.query.filter(Hotel.id == data).all()

    if not session.get('logged_in'):
        topic = Hotel.query.all()
        flash('You have to login')
        return render_template('hotel.html',topic=topic)
    else:    
        data1 = Hotel.query.get_or_404(data)
        return render_template('booking.html',h_data=h_data,data=data1.id)
@app.route('/hook/', methods=['GET', 'POST'])
def hook():
        topic = Hotel.query.all()
        if request.method == 'POST':
          booking = Booking(
            user_id  = session['id'], 
            hotel_id = request.form['hotel'],
            room = "Standard",
            price = "110" 
            )  
          try:
            db.session.add(booking)
            db.session.commit()
          except exc.IntegrityError:
            db.session.rollback()
            flash('Booking Failed') 
            return render_template('hotel.html',topic=topic) 
          return render_template('hotel.html',topic=topic) 
        else:  
           return render_template('hotel.html',topic=topic)        

@app.route('/login', methods=['GET', 'POST'])
def login():
    """Login Form"""
    if request.method == 'GET':
        return render_template('login.html')
    else:
        name = request.form['username']
       # email = request.form['email']
        passw = request.form['password']
        try:
           data = User.query.filter_by(username=name, passwordHash=passw).first()
           #return data.username
           session['logged_in'] = True
           session['id']=data.id
           #return data1
           topic = Hotel.query.all()
           return render_template('hotel.html', data=data.id,topic=topic)
        except:
            flash('Something Wrong') 
            return render_template('login.html')

@app.route('/register/', methods=['GET', 'POST'])
def register():
    """Register Form"""
    if request.method == 'POST':
        new_user = User(
            username=request.form['username'],
            passwordHash=request.form['password'],
            email=request.form['email'],
            creativeTime=int(time.time())
            )
        try:
            db.session.add(new_user)
            db.session.commit()
        except exc.IntegrityError:
            db.session.rollback()
            flash('Something Wrong') 
            return render_template('register.html')  
        return render_template('login.html')
    else:    
        return render_template('register.html')


@app.route("/logout")
def logout():
    """Logout Form"""
    session['logged_in'] = False
    return redirect(url_for('home'))    
@app.route("/check")
def check():
    id1=session["id"]
    try:
      data = Booking.query.filter_by(user_id=id1).first()
      data1 = Hotel.query.filter_by(id=data.hotel_id).first()
      return  render_template('checking.html',hotels=data1,id=data.id)
    except :
        topic = Hotel.query.all()
        flash('No Bookings') 
        return render_template('hotel.html',topic=topic) 

@app.route("/delete/<int:data>")    
def delete(data):
    try:
        user_to_delete=Booking.query.filter_by(hotel_id=data).first()
        db.session.delete(user_to_delete)
        db.session.commit()
        topic = Hotel.query.all()
        flash('Booking Deleted') 
        return render_template('hotel.html',topic=topic) 
    except :
        topic = Hotel.query.all()
        flash('Something wrong in deletion') 
        return render_template('hotel.html',topic=topic)
    
        


if __name__ == '__main__':
    app.debug = True
    db.create_all()
    
    app.run(host='0.0.0.0')