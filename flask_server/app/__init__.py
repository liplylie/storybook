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

with open('./sensitive.json') as data_file:    
    sensitive = json.load(data_file)
    rds_endpoint = sensitive['rds_endpoint']
    username = sensitive['username']
    password = sensitive['password']


app = Flask(__name__, instance_relative_config=True)

app.config.from_object('config')
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://"+username+":"+password+"@"+rds_endpoint+"/"+username


db = SQLAlchemy()
db.init_app(app)
db.app = app

#load database tables from schema
from schema import Images, Users, friendships, messages, Comments, Likes

#create database schema
db.create_all()

#test queries
query_image = Images.query.all()
print(query_image)

query_user = Users.query.all()
print(query_user)

query_comment = Comments.query.all()
print(query_comment)

query_like = Likes.query.all()
print(query_like)

##############################
#load Routes:
from app import routes