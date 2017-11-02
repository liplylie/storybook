from flask import Flask, g
from flask_assets import Environment, Bundle
from flask_sqlalchemy import SQLAlchemy
from config import app_config, basedir
from pprint import pprint
import sqlalchemy_utils
from sqlalchemy_utils import drop_database
import json
import os
import unittest

with open('../sensitive.json') as data_file:    
    sensitive = json.load(data_file)
    rds_endpoint = sensitive['rds_endpoint']
    username = sensitive['username']
    password = sensitive['password']

with open('../db/sample_metadata/sampleImagesSanFrancisco.json') as data_file:    
    data_images = json.load(data_file)

with open('../db/sample_metadata/sampleUserData.json') as data_file:    
    data_users = json.load(data_file)

#############################
#initialize app:
app = Flask(__name__, instance_relative_config=True, static_folder="../../client/public", template_folder="../../client/public")

#############################
#load compiled assets:
assets = Environment(app)
js = Bundle('bundle.js', output='gen/packed.js')
assets.register('js_all', js)

#############################
#app configs:
app.config.from_object('config')
# app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://"+username+":"+password+"@"+rds_endpoint+"/"+username
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://socyjgwo:QD38AgZgQutwEkRMyDW8-6bGdvPsMI1k@pellefant.db.elephantsql.com:5432/socyjgwo"

#############################
#load database:
db = SQLAlchemy()
db.init_app(app)
db.app = app

from schema import Images, Users, friendships, messages, Comments, Likes

from sqlalchemy.schema import DropTable
from sqlalchemy.ext.compiler import compiles

@compiles(DropTable, "postgresql")
def _compile_drop_table(element, compiler, **kwargs):
    return compiler.visit_drop_table(element) + " CASCADE"

DropTable('chatrooms')
DropTable('comments')
DropTable('friendships')
DropTable('images')
DropTable('likes')
DropTable('messages')
DropTable('relationships')
DropTable('users')

db.drop_all()
db.create_all()

# with open('../db/sample_metadata/sampleUserData.json') as data_file:    
#     data_users = json.load(data_file)

# with open('../db/sample_metadata/sampleImagesSanFrancisco.json') as data_file:    
#     data_sf_images = json.load(data_file)

# with open('../db/sample_metadata/sampleMetadata.json') as data_file:    
#     data_images = json.load(data_file)

# with open('../db/sample_metadata/sampleCommentData.json') as data_file:    
#     data_comments = json.load(data_file)

# with open('../db/sample_metadata/sampleLikes_Data.json') as data_file:    
#     data_likes = json.load(data_file)

# for j in data_users:
#   db.session.add(Users(j['name'], j['email'], j['profile_image_url'], j['friends_count']))
# db.session.commit()

# for i in data_sf_images:
#   db.session.add(Images(i['image_url'],  i['scn_code'], i['image_user_id'], i['latitude'], i['longitude'], i['likes_count'], i['caption'], i['image_tags_array']))
# db.session.commit()

# for i in data_images:
#   db.session.add(Images(i['image_url'],  i['scn_code'], i['image_user_id'], i['latitude'], i['longitude'], i['likes_count'], i['caption'], i['image_tags_array']))
# db.session.commit()

# for i in data_comments:
#   db.session.add(Comments(i['text'], i['comment_user_id'], i['comment_image_id']))
# db.session.commit()

# for i in data_likes:
#   db.session.add(Likes(i['like_user_id'], i['like_image_id']))
# db.session.commit()

# db.session.execute("insert into friendships (relating_user_id, related_user_id, friendship_type) values (1,2,'pending')")
# db.session.commit()
# db.session.execute("insert into friendships (relating_user_id, related_user_id, friendship_type) values (1,3,'friend')")
# db.session.commit()
# db.session.execute("insert into friendships (relating_user_id, related_user_id, friendship_type) values (1,4,'friend')")
# db.session.commit()
# db.session.execute("insert into friendships (relating_user_id, related_user_id, friendship_type) values (2,5,'pending')")
# db.session.commit()
# db.session.execute("insert into friendships (relating_user_id, related_user_id, friendship_type) values (5, 1, 'friend')")
# db.session.commit()


# db.session.execute("insert into messages (sender_id, recipient_id, message) values (1,4,'hello')")		
# db.session.commit()		
# db.session.execute("insert into messages (sender_id, recipient_id, message) values (1,4,'hello again')")		
# db.session.commit()		
# db.session.execute("insert into messages (sender_id, recipient_id, message) values (1,3,'chicken butt')")		
# db.session.commit()		
# db.session.execute("insert into messages (sender_id, recipient_id, message) values (4,1,'hey man. hows it going?')")		
# db.session.commit()
# db.session.execute("insert into messages (sender_id, recipient_id, message) values (1,4,'all is good! and you?')")		
# db.session.commit()
# db.session.execute("insert into messages (sender_id, recipient_id, message) values (4,1,'all is well...')")		
# db.session.commit()

query_image = Images.query.all()
print(query_image)

query_user = Users.query.all()
print(query_user)

query_comment = Comments.query.all()
print(query_comment)

query_like = Likes.query.all()
print(query_like)

# query_chatroom = Chatrooms.query.all()
# print(query_chatroom)

##############################
#load Routes:
from app import routes