from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects import postgresql
import sqlalchemy_utils
from app import db
from sqlalchemy import Integer, Table, Column, ForeignKey, \
    create_engine, String, select
from sqlalchemy.orm import Session, relationship
from sqlalchemy.ext.declarative import declarative_base
import json


class Images(db.Model):
  __tablename__ = 'images'
  id = db.Column(db.Integer, primary_key=True)
  image_url = db.Column(db.String(250))
  scn_code = db.Column(db.String(250), nullable=True)
  longitude = db.Column(db.Float)
  latitude = db.Column(db.Float)
  likes_count = db.Column(db.Integer, nullable=True)
  caption = db.Column(db.String(250), nullable=True)
  image_tags_array = db.Column(postgresql.ARRAY(db.String(250)), nullable=True)

  #foreign keys (this table belongs to...)
  image_user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'))  

  #database relationships (this table has many...)
  image_comments = db.relationship("Comments", backref='images', lazy=True)
  image_likes = db.relationship("Likes", backref='images', lazy=True)

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
    return json.dumps({
      "image_url": self.image_url,
      "scn_code":self.scn_code,
      "image_user_id": self.image_user_id,
      "latitude": self.latitude,
      "longitude": self.longitude,
      "likes_count": self.likes_count,
      "caption": self.caption,
      "image_tags_array": self.image_tags_array
    })

friendships = db.Table(
    'friendships',  db.metadata,
    db.Column('relating_user_id', db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), 
                                        primary_key=True),
    db.Column('related_user_id', db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), 
                                        primary_key=True),
    db.Column('friendship_type', db.String(250)), #blocked, friend
)


class Users(db.Model):
  __tablename__ = 'users'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(250))
  email = db.Column(db.String(250), unique=True)
  profile_image_url = db.Column(db.String(250))
  friends_count = db.Column(db.Integer, nullable=True)
  user_tags_array = db.Column(postgresql.ARRAY(db.String(250)), nullable=True)

  #database relationships (this table has many...)
  user_images = db.relationship("Images", backref='users', lazy=True)
  user_messages = db.relationship("Messages", backref='users', lazy=True)
  # user_relationships = db.relationship("friendship", backref='user', lazy=True)
  user_comments = db.relationship("Comments", backref='users', lazy=True)
  user_likes = db.relationship("Likes", backref='users', lazy=True)
  # user_sender = db.relationship("Chatroom", backref='user', lazy=True)
  # user_recipient = db.relationship("Chatroom", backref='user', lazy=True)
  user_friendship = db.relationship("Users", secondary=friendships, primaryjoin=id==friendships.c.relating_user_id, secondaryjoin=id==friendships.c.related_user_id)

  def __init__(self, name, email, profile_image_url, friends_count, user_tags_array):
    self.name = name
    self.email = email
    self.profile_image_url = profile_image_url
    self.friends_count = friends_count
    self.user_tags_array = user_tags_array

  def __repr__(self):
    return json.dumps({
      "id": self.id,
      "name": self.name,
      "email": self.email,
      "profile_image_url": self.profile_image_url,
      "friends_count": self.friends_count,
      "user_tags_array": self.user_tags_array
    })


# this relationship is viewonly and selects across the union of all
# friends
friendship_union = select([
                        friendships.c.relating_user_id, 
                        friendships.c.related_user_id
                        ]).union(
                            select([
                              friendships.c.related_user_id, 
                              friendships.c.relating_user_id]
                            )
                          ).alias()
Users.all_friends = relationship('Users',
                       secondary=friendship_union,
                       primaryjoin=Users.id==friendship_union.c.relating_user_id,
                       secondaryjoin=Users.id==friendship_union.c.related_user_id,
                       viewonly=True) 

class Chatrooms(db.Model):
  __tablename__ = 'chatrooms'
  id = db.Column(db.Integer, primary_key=True)
  admin = db.Column(db.String(250), nullable=True)

  #foreign keys (this table belongs to...)
  chatroom_member = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'))

  #database relationships (this table has many...)
  chatroom_messages = db.relationship("Messages", backref='chatrooms', lazy=True)

  def __init__(self, admin):
    self.admin = admin

  def __repr__(self):
    return json.dumps({
      "admin": self.admin,
    })


class Messages(db.Model):
  __tablename__ = 'messages'
  id = db.Column(db.Integer, primary_key=True)
  message = db.Column(db.String(250))

  #foreign keys (this table belongs to...)
  message_chatroom = db.Column(db.Integer, db.ForeignKey("chatrooms.id"))
  sender = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'))

  def __init__(self, user_id, message, room_id):
    self.user_id = user_id
    self.message = message
    self.room_id = room_id

  def __repr__(self):
    return json.dumps({
      "user_id": self.user_id,
      "message": self.message,
      "room_id": self.room_id
    })

class Comments(db.Model):
  __tablename__ = 'comments'
  id = db.Column(db.Integer, primary_key=True)
  text = db.Column(db.String(750))
  likes_count = db.Column(db.Integer, nullable=True)

  #foreign keys (this table belongs to...)
  comment_user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE')) 
  comment_image_id = db.Column(db.Integer, db.ForeignKey("images.id")) 

  #database relationships (this table has many...)
  comment_likes = db.relationship("Likes", backref='comments', lazy=True)

  def __init__(self,text, likes_count, comment_user_id, comment_image_id):
    self.text = text
    self.likes_count = likes_count
    self.comment_user_id = comment_user_id
    self.comment_image_id = comment_image_id

  def __repr__(self):
    return json.dumps({
      "text": self.text,
      "likes_count": self.likes_count,
      "comment_user_id": self.comment_user_id,
      "comment_image_id": self.comment_image_id
    })


class Likes(db.Model):
  __tablename__ = 'likes'
  id = db.Column(db.Integer, primary_key=True)
  like_type = db.Column(db.String(250))

  #foreign keys (this table belongs to...)
  like_user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE')) 
  like_image_id = db.Column(db.Integer, db.ForeignKey("images.id")) 
  like_comment_id = db.Column(db.Integer, db.ForeignKey("comments.id")) 

  def __init__(self, like_type, like_user_id, like_image_id, like_comment_id):
    self.like_type = like_type
    self.like_user_id = like_user_id
    self.like_image_id = like_image_id
    self.like_comment_id = like_comment_id

  def __repr__(self):
    return json.dumps({
      "like_type": self.like_type,
      "like_user_id": self.like_user_id,
      "like_image_id": self.like_image_id,
      "like_comment_id": self.like_comment_id
    })
