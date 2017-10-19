from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects import postgresql
import sqlalchemy_utils
from app import db

class Image(db.Model):
  __tablename__ = 'image'
  id = db.Column(db.Integer, primary_key=True)
  image_url = db.Column(db.String(250))
  scn_code = db.Column(db.String(250))
  user_id = db.Column(db.Integer)
  location = db.Column(db.String(250))
  likes_count = db.Column(db.Integer)
  caption = db.Column(db.Integer)
  image_tags_array = db.Column(postgresql.ARRAY(db.String(250)))

  def __init__(self, image_url, scn_code, user_id, location, likes_count, caption, image_tags_array):
    self.image_url = image_url
    self.scn_code = scn_code
    self.user_id = user_id
    self.location = location
    self.likes_count = likes_count
    self.caption = caption
    self.image_tags_array = image_tags_array

  def __repr__(self):
    return '<Image tags: %r>' % self.image_tags_array + ' ' + '<image url: %r>' % self.image_url


class User(db.Model):
  __tablename__ = 'user'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(250))
  friends_count = db.Column(db.Integer)
  user_tags_array = db.Column(db.String(250))

  def __init__(self, name, friends_count, user_tags_array):
    self.name = name
    self.friends_count = friends_count
    self.user_tags_array = user_tags_array

  def __repr__(self):
    return '<User: %r>' % self.name + ' ' + '<fuser riends count: %r>' % self.friends_count + ' ' + '<user tags: %r>' % self.tags_array


class Tags(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  url = db.Column(db.String(250))
  tags_array = db.Column(db.String(250))

  def __init__(self, url, tags_array):
    self.url = url
    self.tags_array = tags_array

  def __repr__(self):
    return '<Tags: %r>' % self.url + ' ' + '<Tags: %r>' % self.tags_array

class Relationship(db.Model):
  __tablename__ = 'relationship'
  id = db.Column(db.Integer, primary_key=True)
  relating_user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
  related_user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
  friend_type = db.Column(db.String(250)) # [friend, block, etc]

  relating_user = db.relationship("User", foreign_keys=[relating_user_id])
  related_user = db.relationship("User", foreign_keys=[related_user_id])

  def __init__(self, user_id, friend_id):
    self.user_id = user_id
    self.friend_id = friend_id

  def __repr__(self):
    return '<user_id: %r>' % self.user_id + ' ' + '<friend_id: %r>' % self.friend_id

class Messages(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer) #foreign key
  message = db.Column(db.String(250))
  room_id = db.Column(db.Integer)

  def __init__(self, user_id, message, room_id):
    self.user_id = user_id
    self.message = message
    self.room_id = room_id

  def __repr__(self):
    return '<user_id: %r>' % self.user_id + ' ' + '<message: %r>' % self.message + ' ' + '<room_id: %r>' % self.room_id

class Comments(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer) #foreign key
  image_id = db.Column(db.Integer) #foreign key
  text = db.Column(db.String(250))
  likes_count = db.Column(db.Integer) #foreign key

  def __init__(self, user_id, image_id, text, likes_count):
    self.user_id = user
    self.image_id = image_id
    self.text = text
    self.likes_count = likes_count

  def __repr__(self):
    return '<image_id: %r>' % self.image_id + ' ' + '<Comment text: %r>' % self.text

class Likes(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer) #foreign key
  image_id = db.Column(db.Integer) #foreign key
  comment_id = db.Column(db.Integer) #foreign key
  like_type = db.Column(db.String(250))

  def __init__(self, user_id, image_id, comment_id, like_type):
    self.user_id = user_id
    self.image_id = image_id
    self.comment_id = comment_id
    self.like_type = like_type

  def __repr__(self):
    return '<Like_image_id: %r>' % self.image_id + ' ' + '<Tags: %r>' % self.tags_array
