from flask import Flask, g
from flask_assets import Environment, Bundle
from flask_sqlalchemy import SQLAlchemy
from app import app, db
from config import app_config
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
      os.path.join(app.config['BASEDIR'], TEST_DB)
      self.app = app.test_client()

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

  # executed after each test
  def tearDown(self):
      pass
 

  def test_main_page(self):
      response = self.app.get('/', follow_redirects=True)
      self.assertEqual(response.status_code, 200)
 
 
if __name__ == "__main__":
    unittest.main()