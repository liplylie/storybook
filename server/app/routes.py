from flask import render_template

from app import app

@app.route('/')
def index():
  """This module renders main page"""
  return render_template('index.html')

@app.route('/test')
def test():
  print("ghosts and stuff")