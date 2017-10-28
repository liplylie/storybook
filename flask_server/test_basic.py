from flask import Flask, g
from flask_assets import Environment, Bundle
from flask_sqlalchemy import SQLAlchemy
from app import app, db, DropTable
from app.schema import Images, Users, friendships, Chatrooms, Messages, Comments, Likes
from config import app_config, basedir
from pprint import pprint
import sqlalchemy_utils
from sqlalchemy_utils import drop_database
import json
import os
import unittest

####
# LOAD CREDENTIALS
####
with open('../sensitive.json') as data_file:    
    sensitive = json.load(data_file)
    rds_endpoint = sensitive['rds_endpoint']
    username = sensitive['username']
    password = sensitive['password']


###############################

# SEED DUMMY DATA TO DATABASE:
with open('../db/sample_metadata/sampleUserData.json') as data_file:    
    data_users = json.load(data_file)

with open('../db/sample_metadata/sampleImagesSanFrancisco.json') as data_file:    
    data_images = json.load(data_file)

with open('../db/sample_metadata/sampleCommentData.json') as data_file:    
    data_comments = json.load(data_file)

with open('../db/sample_metadata/sampleLikes_Data.json') as data_file:    
    data_likes = json.load(data_file)

for j in data_users:
  db.session.add(Users(j['name'], j['email'], j['profile_image_url'], j['friends_count'], j['user_tags_array']))
db.session.commit()

for i in data_images:
  db.session.add(Images(i['image_url'],  i['scn_code'], i['image_user_id'], i['latitude'], i['longitude'], i['likes_count'], i['caption'], i['image_tags_array']))
db.session.commit()

for i in data_comments:
  db.session.add(Comments(i['text'],  i['likes_count'], i['comment_user_id'], i['comment_image_id']))
db.session.commit()

for i in data_likes:
  db.session.add(Likes(i['like_type'],  i['like_user_id'], i['like_image_id'], i['like_comment_id']))
db.session.commit()

query_image = Images.query.all()
print(query_image)

query_user = Users.query.all()
print(query_user)

query_comment = Comments.query.all()
print(query_comment)

query_like = Likes.query.all()
print(query_like)

##################
# TESTS:

TEST_DB = 'test.db'

class database_tests(unittest.TestCase):

  # executed prior to each test
  def setUp(self):
      app.config['TESTING'] = True
      app.config['WTF_CSRF_ENABLED'] = False
      app.config['DEBUG'] = False
      app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://"+username+":"+password+"@"+rds_endpoint+"/"+username
      os.path.join(basedir, TEST_DB)
      self.app = app.test_client()


  def tearDown(self):
      pass
 
  def test_main_page(self):
      response = self.app.get('/', follow_redirects=True)
      self.assertEqual(response.status_code, 200)
      print('test_main_page: passed')

  def test_add_image(self):
    self.app.post('/api/add_image', data=dict({
        'url':['https://i.imgur.com/AskrvGz.jpg'],
        'scn_code': '34',
        'image_user_id': 1,
        'latitude': 30,
        'longitude': 23,
        'likes_count': 31,
        'caption': 'lets do this!'
    }))
    test_image = Images.query.order_by(Images.id.desc()).first()
    self.assertEqual(test_image.image_url, 'https://i.imgur.com/AskrvGz.jpg')
    print('test_add_image: passed')

  def test_adduser(self):
    
    #add users
    self.app.post('/api/add_user', data=dict({
        'name': 'jony ive',
        'email': 'mail@mail.com',
        'profile_image_url': 'https://i.imgur.com/AskrvGz.jpg',
        'friends_count': 30,
        'user_tags_array': ['awesome', 'yes'],
    }))
    test_user = Users.query.order_by(Users.id.desc()).first()
    self.assertEqual(test_user.email, 'mail@mail.com')
    print('test_adduser: passed')

  def test_add_comment(self):
    self.app.post('/api/add_comment', data=dict({
    "comment_image_id": 1,
    "comment_user_id": 1,
    "likes_count": 25,
    "text": "hello universe"
    }))
    test_comment = Comments.query.order_by(Comments.id.desc()).first()
    self.assertEqual(test_comment.text, str('hello universe'))
    print('test_add_comment: passed')

  def test_add_like(self):
    self.app.post('/api/add_like', data=dict({
        "like_type": "sad",
        "like_user_id": 1,
        "like_image_id": 1,
        "like_comment_id": 1
    }))
    test_like = Likes.query.order_by(Likes.id.desc()).first()
    self.assertEqual(test_like.like_type, 'sad')
    print('test_add_like: passed')
    

  def test_get_locs_user(self):
    response = self.app.get('/api/get_locs_user', follow_redirects=True)
    self.assertEqual(response.status_code, 200)
    print('test_get_locs_user: passed')

  def test_get_imgs_by_loc(self):
    response = self.app.get('/api/get_imgs_by_loc?latitude=30&longitude=34', follow_redirects=True)
    self.assertEqual(response.status_code, 200)
    print('test_get_imgs_by_loc: passed')

  def test_get_all_friends(self):
    response = self.app.get('/api/get_all_friends?user_id=1', follow_redirects=True)
    self.assertEqual(response.status_code, 200)
    print('test_get_all_friends: passed')


if __name__ == "__main__":
  unittest.main()