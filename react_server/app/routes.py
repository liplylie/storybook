from flask import Flask, g, render_template
from flask_assets import Environment, Bundle
from pprint import pprint
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects import postgresql
from flask import request
from werkzeug.datastructures import ImmutableMultiDict
import sqlalchemy_utils
import json
from schema import Image, User, Relationship, Chatroom, Messages, Comments, Likes
from app import app, db

#import api keys
with open('../sensitive.json') as data_file:    
    sensitive = json.load(data_file)
    azure_key = sensitive['AZURE_KEY']
    print('azure key: ', azure_key)

@app.route('/')
def index():
  """This module renders main page"""
  return render_template('index.html')


@app.route('/api/images', methods=['GET'])
def fetchImages():
  print('HAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHA')
  fetch_images_data = dict(request.args)
  print(Image.query.get(1))


@app.route('/api/addurl', methods=['POST'])
def add_photo():
  print('adding photo...')
  #request.args, .forms, .files, .values also exist. look them up in the docs
  add_photo_data = dict(request.form)
  photo_url = add_photo_data["url"][0]
  photo_url = photo_url.encode('utf-8')
  body = "{'url': '" + photo_url + "'}"

  import httplib, urllib, base64

  headers = {
      # Request headers
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': azure_key
  }

  params = urllib.urlencode({
      # Request parameters
      'visualFeatures': 'Categories,Description,Color',
      'language': 'en',
  })

  try:
      conn = httplib.HTTPSConnection('westus.api.cognitive.microsoft.com')
      conn.request("POST", "/vision/v1.0/analyze?%s" % params, body, headers)
      response = conn.getresponse()
      data = response.read()
      print("received data is: ", data)
      conn.close()
  except Exception as e:
      print("[Errno {0}] {1}".format(e.errno, e.strerror))