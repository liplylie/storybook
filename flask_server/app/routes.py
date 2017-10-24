from flask import Flask, g, render_template, request
from flask_assets import Environment, Bundle
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects import postgresql
from app import app, db
from schema import Image, User, Relationship, Chatroom, Messages, Comments, Likes
from azure_get_tags import get_tags
from werkzeug.datastructures import ImmutableMultiDict
from pprint import pprint
import sqlalchemy_utils
import json

@app.route('/')
def index():
  """This module renders main page"""
  return render_template('index.html')

#add image
@app.route('/api/addurl', methods=['POST'])
def add_photo():
  #request.args, .forms, .files, .values also exist. look them up in the docs
  request_data = dict(request.form)
  url = request_data["url"][0]
  parsed_url = url.encode('utf-8')
  request_body = "{'url': '" + parsed_url + "'}"

  tags = get_tags(request_body)
  db.session.add(Image('','',1,0,0,0,0,tags)) #replace later with actual values
  db.session.commit()

#add user
@app.route('/api/adduser', methods=['POST'])
def add_user():
  #request.args, .forms, .files, .values also exist. look them up in the docs
  request_data = dict(request.form)

  name = request_data["name"][0]
  parsed_name = name.encode('utf-8')

  friends_count = request_data["friends_count"][0]
  user_tags = ['none']

  db.session.add(User(parsed_name, friends_count, user_tags)) #replace later with actual values
  db.session.commit()

@app.route('/api/addcomment', methods=['POST'])
def add_comment():
  #request.args, .forms, .files, .values also exist. look them up in the docs
  request_data = dict(request.form)

  text = request_data["text"][0]
  parsed_text = name.encode('utf-8')
  likes_count = 0
  comment_user_id = request_data["comment_user_id"][0]
  comment_image_id = request_data["comment_image_id"][0]

  db.session.add(Comments(parsed_text, likes_count, comment_user_id, comment_image_id)) #replace later with actual values
  db.session.commit()

@app.route('/api/addlike', methods=['POST'])
def add_like():
  #request.args, .forms, .files, .values also exist. look them up in the docs
  request_data = dict(request.form)

  like_type = request_data["text"][0]
  parsed_like_type = name.encode('utf-8')

  like_user_id = request_data["like_user_id"][0]
  like_image_id = request_data["like_image_id"][0]
  like_comment_id = request_data["like_comment_id"][0]

  db.session.add(Likes(parsed_like_type, like_user_id, like_image_id, like_comment_id)) #replace later with actual values
  db.session.commit()


@app.route('/api/get_loc_user', methods=['GET'])
def grab_photo():
    print("grabbing photo...")
    #get all photos where latitude === request latitude and longitude === request longitude