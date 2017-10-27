from flask import Flask, g, render_template, request, make_response
from flask_assets import Environment, Bundle
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects import postgresql
from app import app, db
from schema import Images, Users, friendships, Chatrooms, Messages, Comments, Likes
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

  db.session.add(Users(parsed_name, friends_count, user_tags)) #replace later with actual values
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


@app.route('/api/get_locs_user', methods=['GET'])
def grab_all_locations():
    get_locs_user_query = db.session.query(Images) #returns all images
    coords = []
    for i in get_locs_user_query:
      new_loc = {
        "latitude": i.latitude,
        "longitude": i.longitude
      }
      coords.append(new_loc)
      print(coords)
    coords = str(coords)
    resp = make_response(coords, 200)
    # return coords
    return resp

@app.route('/api/get_imgs_by_loc', methods=['GET'])
def get_imgs_by_loc():
    print("grabbing photos by specific location...")
    request_data = dict(request.args)
    get_imgs_by_loc_latitude = request_data["latitude"][0]
    get_imgs_by_loc_latitude = float(get_imgs_by_loc_latitude)
    get_imgs_by_loc_longitude = request_data["longitude"][0]
    get_imgs_by_loc_longitude = float(get_imgs_by_loc_longitude)
    
    get_imgs_by_loc_query = db.session.query(Images).filter((Images.latitude > (get_imgs_by_loc_latitude - 0.001)) & (Images.latitude < (get_imgs_by_loc_latitude + 0.001)) & (Images.longitude > (get_imgs_by_loc_longitude - 0.001)) & (Images.longitude < (get_imgs_by_loc_longitude + 0.001)))
    all_images = []
    for j in get_imgs_by_loc_query:
      all_images.append(j.image_url)
      print(all_images)
    all_images = str(all_images)
    resp = make_response(all_images, 200)
    return resp  


#INCOMPLETE
@app.route('/api/get_imgs_by_frs_at_loc', methods=['GET'])
def get_imgs_by_frs_at_loc():
    print("grabbing most recent photo from each friend within a 10 mile radius at OP's location...")
    request_data = dict(request.args)
    # get_imgs_by_frs_at_loc_latitude = request_data["latitude"][0]
    # get_imgs_by_frs_at_loc_latitude_parsed = float(get_imgs_by_frs_at_loc_latitude)
    
    # get_imgs_by_frs_at_loc_longitude = request_data["longitude"][0]
    # get_imgs_by_frs_at_loc_longitude_parsed = float(get_imgs_by_frs_at_loc_longitude)
    
    # get_imgs_by_frs_at_loc_user_id = request_data["user_id"][0]
    # get_imgs_by_frs_at_loc_user_id_parsed = float(get_imgs_by_frs_at_loc_user_id)
    
    get_list_of_friends_query = db.session.query(Users).filter(Users.user_friendship)
    print(get_list_of_friends_query)
    
    
    # get_imgs_by_frs_at_loc_latitude_query = db.session.query(Image).filter((Image.latitude > (get_imgs_by_loc_latitude - 0.001)) & (Image.latitude < (get_imgs_by_loc_latitude + 0.001)) & (Image.longitude > (get_imgs_by_loc_longitude - 0.001)) & (Image.longitude < (get_imgs_by_loc_longitude + 0.001)))
    # get_imgs_by_frs_at_loc_longitude_query = db.session.query()
    # get_imgs_by_frs_at_loc_user_id = db.session.query()
    
    # all_images = []
    # for j in get_imgs_by_loc_query:
    #   all_images.append(j.image_url)
    #   print(all_images)
    # all_images = str(all_images)
    # resp = make_response(all_images, 200)
    # return resp
