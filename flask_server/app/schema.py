from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects import postgresql
import sqlalchemy_utils
from app import db

class Image(db.Model):
  __tablename__ = 'image'
  id = db.Column(db.Integer, primary_key=True)
  image_url = db.Column(db.String(250), unique=True)
  scn_code = db.Column(db.String(250), nullable=True)
  longitude = db.Column(db.Float)
  latitude = db.Column(db.Float)
  likes_count = db.Column(db.Integer, nullable=True)
  caption = db.Column(db.String(250), nullable=True)
  image_tags_array = db.Column(postgresql.ARRAY(db.String(250)), nullable=True)

  #foreign keys (this table belongs to...)
  image_user_id = db.Column(db.Integer, db.ForeignKey("user.id"))  

  #database relationships (this table has many...)
  image_comments = db.relationship("Comments", backref='image', lazy=True)
  image_likes = db.relationship("Likes", backref='image', lazy=True)

  def __init__(self, image_url, scn_code, image_user_id, latitude, longitude, likes_count, caption, image_tags_array):
    self.image_url = image_url
    self.scn_code = scn_code
    self.image_user_id = image_user_id
    self.latitude = latitude
    self.longitude = longitude
    self.likes_count = likes_count
    self.caption = caption
    self.image_tags_array = image_tags_array

  def __repr__(self):
    return '<Image tags: %r>' % self.image_tags_array + ' ' + '<image url: %r>' % self.image_url

class User(db.Model):
  __tablename__ = 'user'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(250), unique=True)
  profile_image_url = db.Column(db.String(250), unique=True)
  friends_count = db.Column(db.Integer, nullable=True)
  user_tags_array = db.Column(postgresql.ARRAY(db.String(250)), nullable=True)

  #database relationships (this table has many...)
  user_images = db.relationship("Image", backref='user', lazy=True)
  user_messages = db.relationship("Messages", backref='user', lazy=True)
  user_relationships = db.relationship("Relationship", backref='user', lazy=True)
  user_comments = db.relationship("Comments", backref='user', lazy=True)
  user_likes = db.relationship("Likes", backref='user', lazy=True)
  # user_sender = db.relationship("Chatroom", backref='user', lazy=True)
  # user_recipient = db.relationship("Chatroom", backref='user', lazy=True)

  def __init__(self, name, friends_count, user_tags_array):
    self.name = name
    self.friends_count = friends_count
    self.user_tags_array = user_tags_array

  def __repr__(self):
    return '<User: %r>' % self.name + ' ' + '<fuser riends count: %r>' % self.friends_count + ' ' + '<user tags: %r>' % self.user_tags_array

class Relationship(db.Model):
  __tablename__ = 'relationship'
  id = db.Column(db.Integer, primary_key=True)
  friend_type = db.Column(db.String(250)) # [friend, block, etc]
  #foreign keys (this table belongs to...)
  related_user_id = db.Column(db.Integer, db.ForeignKey("user.id"))

  def __init__(self, related_user_id, friend_type):
    self.user_id = related_user_id
    self.friend_id = friend_type

  def __repr__(self):
    return '<user_id: %r>' % self.user_id + ' ' + '<friend_id: %r>' % self.friend_id

class Chatroom(db.Model):
  __tablename__ = 'chatroom'
  id = db.Column(db.Integer, primary_key=True)
  admin = db.Column(db.String(250))

  #foreign keys (this table belongs to...)
  chatroom_sender = db.Column(db.Integer, db.ForeignKey("user.id"))
  chatroom_recipient = db.Column(db.Integer, db.ForeignKey("user.id"))

  #database relationships (this table has many...)
  chatroom_messages = db.relationship("Messages", backref='chatroom', lazy=True)

  def __init__(self, admin):
    self.admin = admin

  def __repr__(self):
    return '<image_id: %r>' % self.sender_name

class Messages(db.Model):
  __tablename__ = 'messages'
  id = db.Column(db.Integer, primary_key=True)
  message = db.Column(db.String(250))
  room_id = db.Column(db.Integer)

  #foreign keys (this table belongs to...)
  message_chatroom = db.Column(db.Integer, db.ForeignKey("chatroom.id"))
  sender = db.Column(db.Integer, db.ForeignKey("user.id"))

  def __init__(self, user_id, message, room_id):
    self.user_id = user_id
    self.message = message
    self.room_id = room_id

  def __repr__(self):
    return '<user_id: %r>' % self.user_id + ' ' + '<message: %r>' % self.message + ' ' + '<room_id: %r>' % self.room_id

class Comments(db.Model):
  __tablename__ = 'comments'
  id = db.Column(db.Integer, primary_key=True)
  text = db.Column(db.String(250))
  likes_count = db.Column(db.Integer, nullable=True)

  #foreign keys (this table belongs to...)
  comment_user_id = db.Column(db.Integer, db.ForeignKey("user.id")) 
  comment_image_id = db.Column(db.Integer, db.ForeignKey("image.id")) 

  #database relationships (this table has many...)
  comment_likes = db.relationship("Likes", backref='comments', lazy=True)
  

  def __init__(self,text, likes_count, comment_user_id, comment_image_id):
    self.text = text
    self.likes_count = likes_count
    self.comment_user_id = comment_user_id
    self.comment_image_id = comment_image_id

  def __repr__(self):
    return '<image_id: %r>' % self.image_id + ' ' + '<Comment text: %r>' % self.text

class Likes(db.Model):
  __tablename__ = 'likes'
  id = db.Column(db.Integer, primary_key=True)
  like_type = db.Column(db.String(250))

  #foreign keys (this table belongs to...)
  like_user_id = db.Column(db.Integer, db.ForeignKey("user.id")) 
  like_image_id = db.Column(db.Integer, db.ForeignKey("image.id")) 
  like_comment_id = db.Column(db.Integer, db.ForeignKey("comments.id")) 

  def __init__(self, like_type, like_user_id, like_image_id, like_comment_id):
    self.like_type = like_type
    self.like_user_id = like_user_id
    self.like_image_id = like_image_id
    self.like_comment_id = like_comment_id

  def __repr__(self):
    return '<Like_image_id: %r>' % self.image_id + ' ' + '<Tags: %r>' % self.tags_array