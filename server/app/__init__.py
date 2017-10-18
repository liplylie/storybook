from flask import Flask, g
from flask_assets import Environment, Bundle
from flask_sqlalchemy import SQLAlchemy
from config import app_config
from pprint import pprint
import sqlalchemy_utils
import sqlite3 
import json

with open('../db/sample_metadata/sampleMetadata.json') as data_file:    
    data = json.load(data_file)

#initialize app
app = Flask(__name__, instance_relative_config=True, static_folder="../../client/static", template_folder="../../client/static")

assets = Environment(app)
js = Bundle('bundle.js', output='gen/packed.js')
assets.register('js_all', js)

#load routes
from app import routes

#load configs
app.config.from_object('config')
if sqlalchemy_utils.functions.database_exists("sqlite:////tmp/test.db"):
    sqlalchemy_utils.functions.drop_database("sqlite:////tmp/test.db")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)

from schema import Image

db.create_all()
for i in data:
  print('--------------------------- i is: ', i)
  db.session.add(Image(i['image_url'],  i['scn_code'], i['user_id'], i['location'], i['likes_count'], i['caption'], i['image_tags_array']))

db.session.commit()

query = Image.query.all()
print(query)