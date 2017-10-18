from flask import Flask, g
from flask_assets import Environment, Bundle
from flask_sqlalchemy import SQLAlchemy
from config import app_config
import sqlalchemy_utils
import sqlite3

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

db.session.add(Image(image_url="https://i.imgur.com/pa2dZUg.jpg",  scn_code="123", user_id=0, location="123", likes_count=0, caption="123", image_tags_array="[\"car\", \"yellow\", \"road\", \"transport\", \"sitting\", \"street\", \"parked\", \"driving\", \"truck\", \"city\", \"cat\", \"traffic\"]"))
db.session.add(Image(image_url="https://i.imgur.com/nsilFww.jpg", scn_code="123", user_id=1, location="123", likes_count=0, caption="123", image_tags_array="[\"car\", \"transport\", \"road\", \"blue\", \"surfing\", \"parked\", \"parking\", \"lot\", \"truck\", \"old\", \"bed\", \"meter\", \"mirror\", \"standing\", \"white\"]"))

db.session.commit()

query = Image.query.all()
print(query)