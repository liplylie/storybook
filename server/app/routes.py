from flask import render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects import postgresql
import sqlalchemy_utils
# from app.app import db
from app import app
# from schema import Image, User, Relationship, Chatroom, Messages, Comments, Likes

@app.route('/')
def index():
  """This module renders main page"""
  return render_template('index.html')

@app.route('/api/images')
def test():
  print("ghosts and stuff")