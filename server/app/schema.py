from flask_sqlalchemy import SQLAlchemy
import sqlalchemy_utils
import sqlite3
from app import db

class Image(db.Model):
  __tablename__ = 'Image'
  id = db.Column(db.Integer, primary_key=True)
  image_url = db.Column(db.String(120))
  scn_code = db.Column(db.String(120))
  user_id = db.Column(db.Integer)
  location = db.Column(db.String(120))
  likes_count = db.Column(db.Integer)
  caption = db.Column(db.Integer)
  image_tags_array = db.Column(db.String(120))

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
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(120))
  friends_count = db.Column(db.Integer)
  uer_tags_array = db.Column(db.String(120))

  def __repr__(self):
    return '<User: %r>' % self.name + ' ' + '<fuser riends count: %r>' % self.friends_count + ' ' + '<user tags: %r>' % self.tags_array


class Tags(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  url = db.Column(db.String(120))
  tags_array = db.Column(db.String(120))

  def __repr__(self):
    return '<Tags: %r>' % self.url + ' ' + '<Tags: %r>' % self.tags_array