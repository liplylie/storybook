from flask import render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects import postgresql
from flask import request
from werkzeug.datastructures import ImmutableMultiDict
import sqlalchemy_utils
import json
# from app.app import db
# from schema import Image, User, Relationship, Chatroom, Messages, Comments, Likes
from app import app
# from schema import Image, User, Relationship, Chatroom, Messages, Comments, Likes

@app.route('/')
def index():
  """This module renders main page"""
  return render_template('index.html')

@app.route('/api/images', methods=['GET','POST'])

def fetchImages():
  print('HAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHA')
  data = dict(request.args)
  print(data)