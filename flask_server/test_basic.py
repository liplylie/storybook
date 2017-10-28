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

with open('../sensitive.json') as data_file:    
    sensitive = json.load(data_file)
    rds_endpoint = sensitive['rds_endpoint']
    username = sensitive['username']
    password = sensitive['password']

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
      print('--------------------------------\ntest_main_page: passed\n--------------------------------')

  def test_add_image(self):
      self.app.post('/api/add_image', data=dict({
          'url':['https://i.imgur.com/AskrvGz.jpg'],
          'scn_code': '34',
          'image_user_id': 1,
          'latitude': 30,
          'longitude': 23,
          'likes_count': 31,
          'caption': 'let\'s do this!'
          }))
      test_image = Images.query.order_by(Images.id.desc()).first()
      print('||||||||||||||-----------------', test_image.image_url)
      test_image_url = test_image.image_url;
      print(test_image)
      self.assertEqual(test_image.image_url, 'https://i.imgur.com/AskrvGz.jpg')
      
      print('--------------------------------\ntest_add_photo: passed\n--------------------------------') 

  def test_adduser(self):

      print('--------------------------------\ntest_adduser: passed\n--------------------------------') 

  def test_addcomment(self):
      response = self.app.get('/api/addcomment', follow_redirects=True)

      #your test here

      print('--------------------------------\ntest_addcomment: passed\n--------------------------------') 

  def test_addlike(self):
      response = self.app.get('/api/addlike', follow_redirects=True)

      #your test here

      print('--------------------------------\ntest_addlike: passed\n--------------------------------') 

  def test_get_locs_user(self):
      response = self.app.get('/api/get_locs_user', follow_redirects=True)

      #your test here

      print('--------------------------------\ntest_get_locs_user: passed\n--------------------------------') 

  def test_get_imgs_by_loc(self):
      response = self.app.get('/api/get_imgs_by_loc', follow_redirects=True)

      #your test here

      print('--------------------------------\ntest_get_imgs_by_loc: passed\n--------------------------------') 
 
  def test_get_imgs_by_frs_at_loc(self):
      response = self.app.get('/api/get_imgs_by_frs_at_loc', follow_redirects=True)

      #your test here

      print('--------------------------------\ntest_get_imgs_by_frs_at_loc: passed\n--------------------------------') 


if __name__ == "__main__":
    unittest.main()