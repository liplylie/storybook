from flask import Flask, g
from flask_assets import Environment, Bundle
from flask_sqlalchemy import SQLAlchemy
from config import app_config
from pprint import pprint
import sqlalchemy_utils
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

app.config.from_object('config')
app.config['SECRET_KEY'] = 'x_h7PkNBTqrc5CeucKQuTgByEq-D8lb8'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://zdhbeaoe:x_h7PkNBTqrc5CeucKQuTgByEq-D8lb8@pellefant.db.elephantsql.com:5432/zdhbeaoe'

db = SQLAlchemy()

db.init_app(app)
db.app = app

from schema import Image, User

db.drop_all()
db.create_all()
db.session.add(User("hello", 0, ["yes"]))

for i in data:
  db.session.add(Image(i['image_url'],  i['scn_code'], i['image_user_id'], i['location'], i['likes_count'], i['caption'], i['image_tags_array']))
db.session.commit()

query = Image.query.all()
print(query)