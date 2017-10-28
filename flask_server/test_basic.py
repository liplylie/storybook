from flask import Flask, g
from flask_assets import Environment, Bundle
from flask_sqlalchemy import SQLAlchemy
from app import app, db, DropTable
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

  def test_main_page(self):
      response = self.app.get('/api/addurl', follow_redirects=True)

      #your test here

      print('--------------------------------\ntest_main_page: passed\n--------------------------------') 

  def test_main_page(self):
      response = self.app.get('/api/adduser', follow_redirects=True)

      #your test here

      print('--------------------------------\ntest_main_page: passed\n--------------------------------') 

  def test_main_page(self):
      response = self.app.get('/api/addcomment', follow_redirects=True)

      #your test here

      print('--------------------------------\ntest_main_page: passed\n--------------------------------') 

  def test_main_page(self):
      response = self.app.get('/api/addlike', follow_redirects=True)

      #your test here

      print('--------------------------------\ntest_main_page: passed\n--------------------------------') 

  def test_main_page(self):
      response = self.app.get('/api/get_locs_user', follow_redirects=True)

      #your test here

      print('--------------------------------\ntest_main_page: passed\n--------------------------------') 

  def test_main_page(self):
      response = self.app.get('/api/get_imgs_by_loc', follow_redirects=True)

      #your test here

      print('--------------------------------\ntest_main_page: passed\n--------------------------------') 
 
  def test_main_page(self):
      response = self.app.get('/api/get_imgs_by_frs_at_loc', follow_redirects=True)
      
      #your test here

      print('--------------------------------\ntest_main_page: passed\n--------------------------------') 


if __name__ == "__main__":
    unittest.main()