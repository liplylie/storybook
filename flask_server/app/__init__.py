from flask import Flask, g
from flask_assets import Environment, Bundle
from flask_sqlalchemy import SQLAlchemy
from config import app_config
from pprint import pprint
import sqlalchemy_utils
import json

with open('../sensitive.json') as data_file:    
    sensitive = json.load(data_file)
    rds_endpoint = sensitive['rds_endpoint']
    username = sensitive['username']
    password = sensitive['password']

with open('../db/sample_metadata/sampleMetadata.json') as data_file:    
    data_images = json.load(data_file)

with open('../db/sample_metadata/sampleUserData.json') as data_file:    
    data_users = json.load(data_file)

#############################
#initialize app:
app = Flask(__name__, instance_relative_config=True, static_folder="../../client/static", template_folder="../../client/static")

#############################
#load compiled assets:
assets = Environment(app)
js = Bundle('bundle.js', output='gen/packed.js')
assets.register('js_all', js)

#############################
#app configs:
app.config.from_object('config')
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://"+username+":"+password+"@"+rds_endpoint+"/"+username

#############################
#load database:
db = SQLAlchemy()
db.init_app(app)
db.app = app

from schema import Image, User, Relationship, Chatroom, Messages, Comments, Likes

db.drop_all()
db.create_all()

for j in data_users:
  db.session.add(User(j['first_name'],  j['last_name'], j['email'], j['profile_image_url'], j['friends_count'], j['user_tags_array']))
db.session.commit()

for i in data_images:
  db.session.add(Image(i['image_url'],  i['scn_code'], i['image_user_id'], i['latitude'], i['longitude'], i['likes_count'], i['caption'], i['image_tags_array']))
db.session.commit()

query_user = User.query.all()
print(query_user)

query_image = Image.query.all()
print(query_image)

##############################
#load Routes:
from app import routes