from flask import Flask, g
from flask_assets import Environment, Bundle
from flask_sqlalchemy import SQLAlchemy
from config import app_config
import sqlalchemy_utils
import sqlite3
from app import db

class Image(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  url = db.Column(db.String(80))
  tags = db.Column(db.String(120))

  def __repr__(self):
    return '<Image: %r>' % self.url + ' ' + '<Tags: %r>' % self.tags