from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects import postgresql
import sqlalchemy_utils
from app import db
from sqlalchemy import Integer, Table, Column, ForeignKey, \
    create_engine, String, select
from sqlalchemy.orm import Session, relationship
from sqlalchemy.ext.declarative import declarative_base

Base= declarative_base()

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
  image_user_id = db.Column(db.Integer, db.ForeignKey("user.id", ondelete='CASCADE'))  

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
    return '<<<Image tags: %r>>>' % self.image_tags_array + ' ' + '<<<image url: %r>>>' % self.image_url

friendship = db.Table(
    'friendships',  db.metadata,
    db.Column('relating_user_id', db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), 
                                        primary_key=True),
    db.Column('related_user_id', db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), 
                                        primary_key=True)
)


class User(db.Model):
  __tablename__ = 'user'
  id = db.Column(db.Integer, primary_key=True)
  first_name = db.Column(db.String(250))
  last_name = db.Column(db.String(250))
  email = db.Column(db.String(250), unique=True)
  profile_image_url = db.Column(db.String(250))
  friends_count = db.Column(db.Integer, nullable=True)
  user_tags_array = db.Column(postgresql.ARRAY(db.String(250)), nullable=True)

  #database relationships (this table has many...)
  user_images = db.relationship("Image", backref='user', lazy=True)
  user_messages = db.relationship("Messages", backref='user', lazy=True)
  # user_relationships = db.relationship("friendship", backref='user', lazy=True)
  user_comments = db.relationship("Comments", backref='user', lazy=True)
  user_likes = db.relationship("Likes", backref='user', lazy=True)
  # user_sender = db.relationship("Chatroom", backref='user', lazy=True)
  # user_recipient = db.relationship("Chatroom", backref='user', lazy=True)
  user_friendship = db.relationship("User", secondary=friendship, primaryjoin=id==friendship.c.relating_user_id, secondaryjoin=id==friendship.c.related_user_id)

  def __init__(self, first_name, last_name, email, profile_image_url, friends_count, user_tags_array):
    self.first_name = first_name
    self.last_name = last_name
    self.email = email
    self.profile_image_url = profile_image_url
    self.friends_count = friends_count
    self.user_tags_array = user_tags_array

  def __repr__(self):
    return '| User: %r>>>' % self.first_name + ' ' + '<<<user friends count: %r>>>' % self.friends_count + ' ' + '<<<user tags: %r>>>' % self.user_tags_array



# this relationship is viewonly and selects across the union of all
# friends
friendship_union = select([
                        friendship.c.relating_user_id, 
                        friendship.c.related_user_id
                        ]).union(
                            select([
                                friendship.c.related_user_id, 
                                friendship.c.relating_user_id]
                            )
                    ).alias()
User.all_friends = relationship('User',
                       secondary=friendship_union,
                       primaryjoin=User.id==friendship_union.c.relating_user_id,
                       secondaryjoin=User.id==friendship_union.c.related_user_id,
                       viewonly=True) 

# class Friendship(db.Model):
#   __tablename__ = 'friendship'
#   # id = db.Column(db.Integer, primary_key=True)
#   relationship_type = db.Column(db.String(250)) # [friend, block, etc]
#   #foreign keys (this table belongs to...)

#   relating_user_id = db.Column(db.Integer, db.ForeignKey("user.id"), primary_key=True)
#   related_user_id = db.Column(db.Integer, db.ForeignKey("user.id"), primary_key=True)

#   #select * 

  # def __init__(self, relating_user_id, related_user_id, relationship_type):
  #   self.relating_user_id = relating_user_id
  #   self.related_user_id = related_user_id
  #   self.relationship_type = relationship_type

  # def __repr__(self):
  #   return '| relating_user_id: %r>>>' % self.relating_user_id + ' ' + '<<< related_user_id: %r>>>' % self.related_user_id + ' ' + '<<<relationship_type: %r>>>' % self.relationship_type

class Chatroom(db.Model):
  __tablename__ = 'chatroom'
  id = db.Column(db.Integer, primary_key=True)
  admin = db.Column(db.String(250))

  #foreign keys (this table belongs to...)
  chatroom_sender = db.Column(db.Integer, db.ForeignKey("user.id", ondelete='CASCADE'))
  chatroom_recipient = db.Column(db.Integer, db.ForeignKey("user.id", ondelete='CASCADE'))

  #database relationships (this table has many...)
  chatroom_messages = db.relationship("Messages", backref='chatroom', lazy=True)

  def __init__(self, admin):
    self.admin = admin

  def __repr__(self):
    return '<<<image_id: %r>>>' % self.sender_name

class Messages(db.Model):
  __tablename__ = 'messages'
  id = db.Column(db.Integer, primary_key=True)
  message = db.Column(db.String(250))

  #foreign keys (this table belongs to...)
  
  message_chatroom = db.Column(db.Integer, db.ForeignKey("chatroom.id"))
  sender = db.Column(db.Integer, db.ForeignKey("user.id", ondelete='CASCADE'))

  def __init__(self, user_id, message, room_id):
    self.user_id = user_id
    self.message = message
    self.room_id = room_id

  def __repr__(self):
    return '<<<user_id: %r>>>' % self.user_id + ' ' + '<<<message: %r>>>' % self.message + ' ' + '<<<room_id: %r>>>' % self.room_id

class Comments(db.Model):
  __tablename__ = 'comments'
  id = db.Column(db.Integer, primary_key=True)
  text = db.Column(db.String(250))
  likes_count = db.Column(db.Integer, nullable=True)

  #foreign keys (this table belongs to...)
  comment_user_id = db.Column(db.Integer, db.ForeignKey("user.id", ondelete='CASCADE')) 
  comment_image_id = db.Column(db.Integer, db.ForeignKey("image.id")) 

  #database relationships (this table has many...)
  comment_likes = db.relationship("Likes", backref='comments', lazy=True)
  

  def __init__(self,text, likes_count, comment_user_id, comment_image_id):
    self.text = text
    self.likes_count = likes_count
    self.comment_user_id = comment_user_id
    self.comment_image_id = comment_image_id

  def __repr__(self):
    return '<<<image_id: %r>>>' % self.image_id + ' ' + '<<<Comment text: %r>>>' % self.text

class Likes(db.Model):
  __tablename__ = 'likes'
  id = db.Column(db.Integer, primary_key=True)
  like_type = db.Column(db.String(250))

  #foreign keys (this table belongs to...)
  like_user_id = db.Column(db.Integer, db.ForeignKey("user.id", ondelete='CASCADE')) 
  like_image_id = db.Column(db.Integer, db.ForeignKey("image.id")) 
  like_comment_id = db.Column(db.Integer, db.ForeignKey("comments.id")) 

  def __init__(self, like_type, like_user_id, like_image_id, like_comment_id):
    self.like_type = like_type
    self.like_user_id = like_user_id
    self.like_image_id = like_image_id
    self.like_comment_id = like_comment_id

  def __repr__(self):
    return '<<<Like_image_id: %r>>>' % self.image_id + ' ' + '<<<Tags: %r>>>' % self.tags_array