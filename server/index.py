from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import BaseConfig
from flask_bcrypt import Bcrypt
from flask_assets import Environment, Bundle

# app = Flask(__name__, static_folder="./static/dist", template_folder="./static")
app = Flask(__name__, static_folder="../client/static", template_folder="../client/static")
app.config.from_object(BaseConfig)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
assets = Environment(app)
js = Bundle('bundle.js', output='gen/packed.js')

assets.register('js_all', js)