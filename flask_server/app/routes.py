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
@app.route('/api/add_image', methods=['POST'])
def add_photo():
  #request.args, .forms, .files, .values also exist. look them up in the docs
  request_data = dict(request.form)

  #image URL
  url = request_data["url"][0]
  parsed_url = url.encode('utf-8')

  #tags
  request_body = "{'url': '" + parsed_url + "'}"

  image_tags = get_tags(request_body)

  #scn_code(currently set to '0')
  # scn_code = request_data["scn_code"][0]
  scn_code = '0'
  parsed_scn_code = scn_code.encode('utf-8')

  image_user_id = request_data["image_user_id"][0]
  parsed_image_user_id = int(image_user_id)
  
  #geolocation
  latitude = request_data["latitude"][0]
  parsed_latitude = int(latitude)

  longitude = request_data["longitude"][0]
  parsed_longitude = int(longitude)

  likes_count = request_data["likes_count"][0]
  parsed_likes_count = int(likes_count)

  image_caption = request_data["caption"][0]
  parsed_image_caption = image_caption.encode('utf-8')

  db.session.add(Images(parsed_url,parsed_scn_code, parsed_image_user_id, parsed_latitude, parsed_longitude, parsed_likes_count, parsed_image_caption, image_tags)) #replace later with actual values
  db.session.commit()
  resp = make_response('added successfully!', 201)
  return resp


#add user
@app.route('/api/add_user', methods=['POST'])
def add_user():
  #request.args, .forms, .files, .values also exist. look them up in the docs
  request_data = dict(request.form)

  name = request_data["name"][0]
  parsed_name = name.encode('utf-8')

  email = request_data["email"][0]
  parsed_email = email.encode('utf-8')

  profile_image_url = request_data["profile_image_url"][0]
  parsed_profile_image_url = profile_image_url.encode('utf-8')

  friends_count = request_data["friends_count"][0]
  parsed_friends_count = int(friends_count)

  # user_tags_array = 
  user_tags_array = ['']

  db.session.add(Users(parsed_name, parsed_email, parsed_profile_image_url, parsed_friends_count, user_tags_array)) #replace later with actual values
  db.session.commit()
  resp = make_response('added successfully!', 201)
  return resp


@app.route('/api/add_comment', methods=['POST'])
def add_comment():
  #request.args, .forms, .files, .values also exist. look them up in the docs
  request_data = dict(request.form)

  text = request_data["text"][0]
  parsed_text = text.encode('utf-8')
  likes_count = 0
  comment_user_id = request_data["comment_user_id"][0]
  comment_image_id = request_data["comment_image_id"][0]

  db.session.add(Comments(parsed_text, likes_count, comment_user_id, comment_image_id)) #replace later with actual values
  db.session.commit()
  resp = make_response('added successfully!', 201)
  return resp


@app.route('/api/add_like', methods=['POST'])
def add_like():
  #request.args, .forms, .files, .values also exist. look them up in the docs
  request_data = dict(request.form)

  like_type = request_data["like_type"][0]
  parsed_like_type = like_type.encode('utf-8')

  like_user_id = request_data["like_user_id"][0]
  parsed_like_user_id = int(like_user_id)
  
  like_image_id = request_data["like_image_id"][0]
  parsed_like_image_id = int(like_image_id)

  like_comment_id = request_data["like_comment_id"][0]
  parsed_like_comment_id = int(like_comment_id)

  db.session.add(Likes(parsed_like_type, parsed_like_user_id, parsed_like_image_id, parsed_like_comment_id)) #replace later with actual values
  db.session.commit()
  resp = make_response('added successfully!', 201)
  return resp


@app.route('/api/get_all_locations', methods=['GET'])
def grab_all_locations():
    get_all_locations_query = db.session.query(Images) #returns all images
    coords = []
    for i in get_all_locations_query:
      new_loc = {
        "latitude": i.latitude,
        "longitude": i.longitude
      }
      coords.append(new_loc)
    coords = str(coords)
    resp = make_response(coords, 200)
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
    for i in get_imgs_by_loc_query:
      all_images.append(i.image_url)
    all_images = str(all_images)
    resp = make_response(all_images, 200)
    return resp  



@app.route('/api/get_imgs_by_frs_at_loc', methods=['GET'])
def get_imgs_by_frs_at_loc():
    print("grabbing most recent photo from each friend within a 10 mile radius at OP's location...")
    request_data = dict(request.args)

    get_imgs_by_frs_at_loc_latitude = request_data["latitude"][0]
    parsed_get_imgs_by_frs_at_loc_latitude = float(get_imgs_by_frs_at_loc_latitude)
    
    get_imgs_by_frs_at_loc_longitude = request_data["longitude"][0]
    parsed_get_imgs_by_frs_at_loc_longitude = float(get_imgs_by_frs_at_loc_longitude)
    
    get_imgs_by_frs_at_loc_user_id = request_data["userId"][0]
    parsed_get_imgs_by_frs_at_loc_user_id = int(get_imgs_by_frs_at_loc_user_id)
    
    get_list_of_friends_query = db.session.execute('SELECT * FROM users RIGHT JOIN friendships ON users.id = friendships.relating_user_id WHERE id = ' + str(parsed_get_imgs_by_frs_at_loc_user_id))

    list_of_photos = []
    for i in get_list_of_friends_query:
      print(i.related_user_id)
      parsed_user_id = int(i.related_user_id)
      most_recent_image_at_loc = Images.query.filter_by(image_user_id=parsed_user_id).filter((Images.latitude > (parsed_get_imgs_by_frs_at_loc_latitude - 0.001)) & (Images.latitude < (parsed_get_imgs_by_frs_at_loc_latitude + 0.001)) & (Images.longitude > (parsed_get_imgs_by_frs_at_loc_longitude - 0.001)) & (Images.longitude < (parsed_get_imgs_by_frs_at_loc_longitude + 0.001))).order_by(Images.id.desc()).first()
      print(most_recent_image_at_loc)
      if (most_recent_image_at_loc):
        list_of_photos.append(most_recent_image_at_loc)
      print("list of photos...", list_of_photos)
    list_of_photos = str(list_of_photos)

    resp = make_response(list_of_photos, 200)
    return resp   


@app.route('/api/get_all_friends', methods=['GET'])
def get_all_friends():
    print("grabbing list of user's friends...")
    request_data = dict(request.args)
    
    get_all_friends_user_id = request_data["userId"][0]
    parsed_get_all_friends_user_id = int(get_all_friends_user_id)
    
    get_all_friends_query = db.session.execute('SELECT * FROM users RIGHT JOIN friendships ON users.id = friendships.relating_user_id')
    
    list_of_friends = []
    for i in get_all_friends_query:
      list_of_friends.append(i.related_user_id)
    list_of_friends = str(list_of_friends)
    resp = make_response(list_of_friends, 200)
    return resp

# get all friends using req.params.userId along with name and profile picture of the friend
  #DONE



# get all friend requests using req.params.userId along with name and profile pic
# add a friend using relating_user_id: req.body.friendId, 
    #related_user_id: req.body.userId and friendship_type: 'pending'
# get all requests using req.params.userId where type = 'pending'
# accept request - using relating_user_id: req.body.userId, related_user_id: req.body.friendId
   # and update type to 'friend'
# delete request using req.body.userId and req.body.friendId
# block a user so changing type to 'blocked' using req.body.userId and req.body.friendId
# a search method. 
   #if there is a req.params.lastName search by that req.params.firstName + req.params.lastName

