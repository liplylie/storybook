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

class Image(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  url = db.Column(db.String(80))
  tags = db.Column(db.String(120))

  def __repr__(self):
    return '<Image: %r>' % self.url + ' ' + '<Tags: %r>' % self.tags

  

db.create_all()

db.session.add(Image(url="https://i.imgur.com/pa2dZUg.jpg", tags="[\"car\", \"yellow\", \"road\", \"transport\", \"sitting\", \"street\", \"parked\", \"driving\", \"truck\", \"city\", \"cat\", \"traffic\"]"))
db.session.add(Image(url="https://i.imgur.com/nsilFww.jpg", tags="[\"car\", \"transport\", \"road\", \"blue\", \"surfing\", \"parked\", \"parking\", \"lot\", \"truck\", \"old\", \"bed\", \"meter\", \"mirror\", \"standing\", \"white\"]"))

db.session.commit()

query = Image.query.all()
print(query)
