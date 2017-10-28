from flask import Flask, g
from flask_assets import Environment, Bundle
from flask_sqlalchemy import SQLAlchemy
from config import app_config
from pprint import pprint
import sqlalchemy_utils
from sqlalchemy_utils import drop_database
import json

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
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://"+username+":"+password+"@"+rds_endpoint+"/"+username

#############################
#load database:
db = SQLAlchemy()
db.init_app(app)
db.app = app

from schema import Images, Users, friendships, Chatrooms, Messages, Comments, Likes

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

##############################
#load Routes:
from app import routes